const validator = require('../services/validator')
const { Locker } = require('../database/sequelize')
const sequelize = require('sequelize')
module.exports = {
    getLockers: async (req, res, next) => {
        let lockers = await Locker.findAll({
            where: {
                id: {
                    [sequelize.Op.notIn]: sequelize.literal('SELECT rentable_id FROM rents WHERE rentable_type = `locker` AND WHERE returned_at IS NULL')
                }
            }
        })
        return res.json({ status: 'ok', data: { lockers: lockers } })
    },

    getLockersStatus: async (req, res, next) => {
        let lockers = await Locker.findAll({
            include: [{
                model: 'rents',
                include: ['user']
            }]
        })
        return res.json({status: 'ok', data: {lockers: lockers}})
    },
}