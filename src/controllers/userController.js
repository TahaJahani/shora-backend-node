const validator = require('../services/validator')
const { User, Role, PasswordReset, PersonalAccessToken } = require('../database/sequelize')
const tokenGenerator = require('../services/token')
const bcrypt = require('bcryptjs');
const mail = require('../services/mail')
module.exports = {
    completeUserInfo: async (req, res, next) => {
        let err = validator.check(req.body, {
            name: 'required|regex:/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/',
            surname: 'required|regex:/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/',
            phone_number: 'numeric',
        })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })
        if (req.user || req.surname)
            return res.json({ status: 'error', message: 'ویرایش دوباره اطلاعات امکان پذیر نیست' })
        let to_update = {
            name: req.body.name,
            surname: req.body.surname,
        }
        if (req.body.phone_number)
            to_update.phone_number = req.body.phone_number
        let user = (await User.update(to_update, { where: { id: req.user.id } }))[1]
        return res.json({ status: 'ok', data: { user: user } })
    },

    checkLogin: async (req, res, next) => {
        if (!req.body.token)
            return res.json({ status: 'error', message: 'unauthorized' })
        let token_id = req.body.token.split('|')[0]
        let token_body = req.body.token.split('|')[1]
        let tokenRecord = PersonalAccessToken.findOne({ where: { id: token_id } })
        if (tokenRecord && bcrypt.compareSync(token_body, tokenRecord.token))
            return res.json({ status: 'ok' })
        return res.json({ status: 'error', message: 'unauthorized' })
    },

    getUser: async (req, res, next) => {
        let err = validator.check(req.params, {
            student_number: 'required|numeric'
        })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })
        let user = await User.findOne({ where: { student_number: req.params.student_number } })
        let status = user ? 'ok' : 'error'
        return res.json({ status: status, data: { user: user } })
    },

    getUsers: async (req, res, next) => {
        let offset = ((req.query.page ? req.query.page : 1) - 1) * 50;
        let users = await User.findAndCountAll({
            include: ['roles'],
            offset: offset,
            limit: 15,
        })
        let hasNext = users.count > offset + 15;
        let lastPage = Math.ceil(users.count / 15);
        users = users.rows
        return res.json({ status: 'ok', data: { data: users, has_next: hasNext, last_page: lastPage } })
    },

    getAllUsersStudentNumber: async (req, res, next) => {
        let users = User.findAll({
            attributes: ['id', 'student_number']
        })
        return res.json({ status: 'ok', data: { users: users } })
    },

    login: async (req, res, next) => {
        let err = validator.check(req.body, {
            student_number: 'required|numeric',
            password: 'required',
        })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })
        let user = await User.findOne({
            where: {
                student_number: req.body.student_number
            },
            include: ['roles']
        })
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            let roles = user.roles.map(role => role.role).sort()
            let tokenText = tokenGenerator.generate(64)
            let salt = bcrypt.genSaltSync(10)
            let token = await PersonalAccessToken.create({
                user_id: user.id,
                token: bcrypt.hashSync(tokenText, salt),
                abilities: roles.join(','),
            })
            let userDataObject = {
                name: user.name,
                surname: user.surname,
                student_number: user.student_number,
                roles: roles,
                token: `${token.id}|${tokenText}`,
            }
            return res.json({ status: 'ok', message: 'خوش آمدید', data: { user: userDataObject } })

        }
        return res.json({ status: 'error', message: 'نام کاربری و یا رمز عبور نادرست می‌باشد' })
    },

    changePassword: async (req, res, next) => {
        let err = validator.check(req.body, {
            old_password: 'required',
            new_passeord: 'required|confirmed',
        })
        if (err.length > 0)
            return res.json({ staus: 'error', message: err[0] })

        if (req.user && bcrypt.compareSync(req.body.old_password, req.user.password)) {
            let salt = bcrypt.genSaltSync(10)
            let new_passeord = bcrypt.hashSync(req.body.new_passeord, salt)
            await User.update({ password: new_passeord }, { where: { id: req.user.id } })
            return res.json({ status: 'ok', message: 'با موفقیت تغییر کرد' })
        }
        return res.json({ status: 'error', message: 'رمز عبور قدیمی نادرست می‌باشد' })
    },

    logout: async (req, res, next) => {
        await PersonalAccessToken.destroy({ where: { user_id: req.user.id } })
        return res.json({ status: 'ok' })
    },

    banUser: async (req, res, next) => {
        let err = validator.check(req.params, { id: 'required|numeric|min:1' })
        if (err.length > 0)
            return res.json({ staus: 'error', message: err[0] })
        await User.update({ is_banned: 1 }, { where: { id: req.params.id } })
        return res.json({ status: 'ok' })
    },

    unbanUser: async (req, res, next) => {
        let err = validator.check(req.params, { id: 'required|numeric|min:1' })
        if (err.length > 0)
            return res.json({ staus: 'error', message: err[0] })
        await User.update({ is_banned: 0 }, { where: { id: req.params.id } })
        return res.json({ status: 'ok' })
    },

    sendResetEmail: async (req, res, next) => {
        let err = validator.check(req.body, {
            email: 'required',
        })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })
        let email = req.body.email.toLowerCase();
        if (email.indexOf('@') === -1)
            email += '@ce.sharif.edu'
        let user = User.findOne({ where: { email: email } })
        if (user) {
            let secure_hash = tokenGenerator.generate(32)
            await PasswordReset.create({
                hash: secure_hash,
                user_id: user.id,
                used: false,
            })

            let url = `${process.env.FRONTEND_URL}/reset-password/${secure_hash}`
            let text = `کاربر گرامی،
            نام کاربری شما در سایت شورای صنفی دانشکده کامپیوتر: ${user.student_number} می‌باشد.
            شما می‌توانید با استفاده از لینک زیر، رمز عبور خود را برای ورود به سایت بازنشانی کنید:
            ${url}
            
            اگر تقاضای بازنشانی رمز عبور خود را نداشتید، این پیام را نادیده بگیرید
            `
            mail.send(user.email, 'بازنشانی رمز عبور', text)
        }
        return res.json({status: 'ok'})
    },

    resetPassword: async (req, res, next) => {
        let err = validator.check(req.body, {
            hash: 'required',
            password: 'required|confirmed',
        })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })

        let reset = await PasswordReset.findOne({
            where: {
                hash: req.body.hash,
            }
        })
        if (!reset)
            return res.json({ status: 'error', message: 'لینک نادرست است و یا منقضی شده' })
        await User.update({
            password: req.body.password
        }, {
            where: { id: reset.user_id }
        })
        reset.used = true
        await reset.save()
        return res.json({ status: 'ok', message: 'با موفقیت بازنشانی شد' })
    },


}