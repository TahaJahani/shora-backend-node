const validator = require('../services/validator')
module.exports = {
    add: (req, res, next) => {
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
        
    },

    delete: (req, res, next) => {

    },

    edit: (req, res, next) => {

    },

    getAll: (req, res, next) => {

    },

    registerUser: (req, res, next) => {

    },


}