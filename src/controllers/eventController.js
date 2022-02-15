const validator = require('../services/validator')
const {Event, User, EventUser, Transaction} = require('../database/sequelize')

module.exports = {
    add: async (req, res, next) => {
        let err = validator.check(req.body, {
            name: 'required',
            start_at: 'required|date',
            finish_at: 'required|date',
            fee: 'required|numeric|min:0',
            gift: 'required|numeric|min:0',
            description: 'required',
        })
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]})
        let event = await Event.create({
            name: req.body.name,
            start_at: req.body.start_at,
            finish_at: req.body.finish_at,
            fee: req.body.fee,
            gift: req.body.gift,
            description: req.body.description,
        })
        event.users = []
        return res.json({status: 'ok', data: {event: event}})
    },

    delete: async (req, res, next) => {
        let err = validator.check(req.params, {id: 'required|numeric|min:1'})
        if (err.length > 0)
            return res.json({status: 'error', message: 'شماره نامعتبر'})
        
        let event = await Event.findOne({
            where: {
                id: req.params.id
            },
            include: ['users']
        })
        if (!event)
            return res.json({status: 'error', message: 'رویداد مورد نظر پیدا نشد'})
        if (event.users.length > 0)
            return res.json({status: 'error', message: 'افرادی در این رویداد ثبت نام کرده‌اند. برای حذف آن با مدیر سایت تماس بگیرید'})
        await event.destroy()
        return res.json({status: 'ok', message: 'با موفقیت حذف شد'})
    },

    edit: async (req, res, next) => {
        let err = validator.check(req.body, {
            event_id: 'required|numeric',
            start_at: 'date',
            finish_at: 'date',
            fee: 'numeric|min:0',
            gift: 'numeric|min:0',
        })
        let to_edit= {}
        if (req.body.start_at)
            to_edit.start_at = req.body.start_at
        if (req.body.finish_at)
            to_edit.finish_at = req.body.finish_at
        if (req.body.fee)
            to_edit.fee = req.body.fee
        if (req.body.gift) {
            let event = await Event.findOne({
                where: {id: req.body.event_id},
                include: ['users'],
            })
            if (event.users.length > 0)
                return res.json({status: 'error', message: 'افرادی در این رویداد ثبت نام کرده‌اند و نمی‌توان هزینه آن‌را تغییر داد'})
            to_edit.gift = req.body.gift
        }
        await Event.update(to_edit, {where: {id: req.body.event_id}})
        return res.json({status: 'ok', message: 'با موفقیت ویرایش شد'})
    },

    getAll: async (req, res, next) => {
        let events = await Event.findAll({
            include: ['users'],
            order: [['start_at', 'DESC']]
        })
        return res.json({status: 'ok', data: {events: events}})
    },

    registerUser: async (req, res, next) => {
        let err = validator.check(req.body, {
            event_id: 'required|numeric|min:1',
            user_id: 'required|numeric|min:1',
        })
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]})
        let userToRegister = await User.findOne({where: {id: req.body.user_id}})
        let event = await Event.findOne({where: {id: req.body.event_id}})
        if (!userToRegister)
            return res.json({status: 'error', message: 'کاربر یافت نشد'})
        if (!event)
            return res.json({status: 'error', message: 'رویداد یافت نشد'})
        await EventUser.create({
            event_id: req.body.event_id,
            user_id: req.body.user_id,
        })

        if (event.fee > 0) {
            let fullName = `${userToRegister.name} ${userToRegister.surname}`
            let eventName = event.name
            let description = `ثبت نام شخص ${fullName} در رویداد ${eventName}`
            let transaction = await Transaction.create({
                amount: event.fee,
                description: description,
                type: 'deposit',
                at: new Date(),
            })
        }

        return res.json({status: 'ok', message: 'با موفقیت ثبت شد', data: {user: userToRegister}})
        
    },


}