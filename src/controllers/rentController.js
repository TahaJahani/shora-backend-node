const validator = require('../services/validator')
const { Rent, User, Locker, Book, Transaction } = require('../database/sequelize')
const { Op } = require('sequelize')
const redis = require('redis');

const client = redis.createClient({
    host: "host.docker.internal",
    port: "6379"
});

module.exports = {
    getRents: async (req, res, next) => {
        client.get('rents', async (err, result) => {
            if (err != null) {
                res.status(500).send(JSON.stringify(
                    {"error": err.message,}
                ));
            } else if (result == undefined || result == null) {
                let rents = await Rent.findAll({
                    where: {
                        returned_at: { [Op.is]: null }
                    },
                    include: ['user', 'rentable']
                })
                client.set(hash, JSON.stringify({ status: 'ok', data: { rents: rents } }), 'EX', 60 * 60 * 24);
                res.json({ status: 'ok', data: { rents: rents } })
            } else {
                res.json(JSON.parse(result));
            }
        });
        
        
    },

    addRent: async (req, res, next) => {
        let err = validator.check(req.body, {
            rentable_type: 'required|in:locker,book',
            rentable_id: 'required|numeric',
            user_id: 'required|numeric',
            amount_paid: 'numeric|min:0',
            rented_at: 'date',
            return_deadline: 'required|date',
        })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })

        let rentUser = await User.findOne({ where: { id: req.body.user_id } })
        if (!rentUser)
            return res.json({ status: 'error', message: 'کاربر یافت نشد' })
        let rentable = req.body.rentable_type === 'locker'
            ? await Locker.findOne({ where: { id: req.body.rentable_id } })
            : await Book.findOne({ where: { id: req.body.rentable_id } })
        if (!rentable)
            return res.json({ status: 'error', message: 'شماره لاکر / کتاب نادرست است' })
        
        let rent = await Rent.create({
            rentable_id: req.body.rentable_id,
            rentable_type: req.body.rentable_type,
            user_id: req.body.user_id,
            amount_paid: req.body.amount_paid ? req.body.amount_paid : 0,
            rented_at: req.body.rented_at ? req.body.rented_at : new Date(),
            return_deadline: req.body.return_deadline
        })

        if (req.body.amount_paid && req.body.amount_paid > 0) {
            let description = `پرداخت ودیعه شخص ${rentUser.name} ${rentUser.surname} برای کرایه‌ی ${rent.id}`
            let transaction = await Transaction.create({
                amount: req.body.amount_paid,
                description: description,
                type: 'deposit',
                at: req.body.rented_at ? req.body.rented_at : new Date(),
            })
        }

        rent.user = rentUser
        rent.rentable = rentable

        client.del('rents');
        return res.json({status: 'ok', message: 'با موفقیت ثبت شد', data: {rent: rent}})
    },

    returnRent: async (req, res, next) => {
        let err = validator.check(req.body, {
            rent_id: 'required|numeric',
            returned_at: 'required|date',
            amount_returned: 'required|numeric|min:0'
        })
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]})
        
        let updated = (await Rent.update({
            returned_at: req.body.returned_at,
            amount_returned: req.body.amount_returned
        }, {
            where: {
                id: req.body.rent_id
            }
        }))[1]

        if (req.body.amount_returned && updated) {
            let description = `بازگشت ودیعه کرایه شماره ${updated.id}`
            let transaction = await Transaction.create({
                amount: req.body.amount_returned,
                description: description,
                type: 'withdraw',
                at: req.body.returned_at
            })
        }

        client.del('rents');
        return res.json({status: 'ok', message: 'با موفقیت ثبت شد'})
    }
}