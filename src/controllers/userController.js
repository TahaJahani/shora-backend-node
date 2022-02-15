const validator = require('../services/validator')
const {User, Role, PasswordReset, PersonalAccessToken} = require('../database/sequelize')
const tokenGenerator = require('../services/token')
const bcrypt = require('bcryptjs');
module.exports = {
    completeUserInfo: async (req, res, next) => {

    },

    checkLogin: async (req, res, next) => {

    },

    getUser: async (req, res, next) => {

    },

    getUsers: async (req, res, next) => {

    },

    getAllUsersStudentNumber: async (req, res, next) => {

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

    },

    logout: async (req, res, next) => {

    },

    banUser: async (req, res, next) => {

    },

    unbanUser: async (req, res, next) => {

    },

    sendResetEmail: async (req, res, next) => {

    },

    resetPassword: async (req, res, next) => {

    },


}