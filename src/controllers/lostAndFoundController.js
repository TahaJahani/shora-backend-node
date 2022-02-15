const validator = require('../services/validator')
const {LostAndFound} = require('../database/sequelize')
const { Op } = require("sequelize");
module.exports = {
    getAll: (req, res, next) => {
        let found = await LostAndFound.findAll({where: {returned_at: {[Op.is]: null}}})
        return res.json({status: 'ok', data: {lost_and_found: found}})
    },

    add: (req, res, next) => {
        let err = validator.check(req.body, {
            name: 'required',
            found_in: 'required',
            found_at: 'required|date',
        })
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]})

        let found = await LostAndFound.create({
            name: req.body.name,
            found_in: req.body.found_in,
            found_at: req.body.found_at,
        })

        return res.json({status: 'ok', data: {lost_and_found: found}})

    },

    remove: (req, res, next) => {
        let err = validator.check(req.params, {found_id: 'required|numeric|min:1'})
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]})
        await LostAndFound.destroy({
            where: {
                id: req.params.found_id
            }
        })
        return res.json({status: 'ok'})
    },

    return: (req, res, next) => {
        let err = validator.check(req.params, {found_id: 'required|numeric|min:1'})
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]})
        await LostAndFound.update({returned_at: new Date()}, {
            where: {
                id: req.params.found_id
            }
        })
        return res.json({status: 'ok'})
    },


}