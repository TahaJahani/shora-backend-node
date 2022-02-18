const validator = require('../services/validator')
const {LostAndFound} = require('../database/sequelize')
const { Op } = require("sequelize");
const redis = require('redis');

const client = redis.createClient({
    host: "host.docker.internal",
    port: "6379"
});

module.exports = {
    getAll: async (req, res, next) => {
        client.get('getAllLostAndFounds', (err, result) => {
            if (err != null) {
                res.status(500).send(JSON.stringify(
                    {"error": err.message,}
                ));
            } else if (result == undefined || result == null) {
                let found = await LostAndFound.findAll({where: {returned_at: {[Op.is]: null}}})
                client.set('getAllLostAndFounds', JSON.stringify({status: 'ok', data: {found: found}}), 'EX', 60 * 60 * 24);
                return res.json({status: 'ok', data: {lost_and_found: found}})
            } else {
                res.json(JSON.parse(result));
            }
        });
    },

    add: async (req, res, next) => {
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

        client.del('getAllLostAndFounds');
        return res.json({status: 'ok', data: {lost_and_found: found}})

    },

    remove: async (req, res, next) => {
        let err = validator.check(req.params, {found_id: 'required|numeric|min:1'})
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]})
        await LostAndFound.destroy({
            where: {
                id: req.params.found_id
            }
        })

        client.del('getAllLostAndFounds');
        return res.json({status: 'ok'})
    },

    return: async (req, res, next) => {
        let err = validator.check(req.params, {found_id: 'required|numeric|min:1'})
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]})
        await LostAndFound.update({returned_at: new Date()}, {
            where: {
                id: req.params.found_id
            }
        })
        
        client.del('getAllLostAndFounds');
        return res.json({status: 'ok'})
    },


}