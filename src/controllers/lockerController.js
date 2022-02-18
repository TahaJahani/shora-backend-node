const validator = require('../services/validator')
const { Locker } = require('../database/sequelize')
const sequelize = require('sequelize');

const redis = require('redis');

const client = redis.createClient({
    host: "host.docker.internal",
    port: "6379"
});

module.exports = {
    getLockers: async (req, res, next) => {
        client.get('lockers', async (err, result) => {
            if (err != null) {
                res.status(500).send(JSON.stringify(
                    {"error": err.message,}
                ));
            } else if (result == undefined || result == null) {
                let lockers = await Locker.findAll({
                    where: {
                        id: {
                            [sequelize.Op.notIn]: sequelize.literal('SELECT rentable_id FROM rents WHERE rentable_type = `locker` AND WHERE returned_at IS NULL')
                        }
                    }
                });
                client.set('lockers', JSON.stringify({ status: 'ok', data: { lockers: lockers } }), 'EX', 60 * 60 * 24);
                res.json({ status: 'ok', data: { lockers: lockers } });
            } else {
                res.json(JSON.parse(result));
            }
        });
    },

    getLockersStatus: async (req, res, next) => {
        client.get('lockersstatus', async (err, result) => {
            if (err != null) {
                res.status(500).send(JSON.stringify(
                    {"error": err.message,}
                ));
            } else if (result == undefined || result == null) {
                let lockers = await Locker.findAll({
                    include: [{
                        model: 'rents',
                        include: ['user']
                    }]
                })
                client.set('lockersstatus', JSON.stringify({ status: 'ok', data: { lockers: lockers } }), 'EX', 60 * 60 * 24);
                res.json({status: 'ok', data: {lockers: lockers}})
            } else {
                res.json(JSON.parse(result));
            }
        });
    },
}