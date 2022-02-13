const { Op } = require("sequelize")
const { Demand, Like, User, DemandCategory } = require("../database/sequelize")
const demandResource = require('../resources/demandResource')
const validator = require('../services/validator')

module.exports = {
    get: async (req, res) => {
        let err = validator.check(req.params, { id: 'required|numeric|min:1' })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })
        let demand = await Demand.findOne({
            where: {
                id: req.params.id
            },
            include: ['likes', 'category']
        })
        if (!demand)
            return res.json({ status: 'error', message: 'تقاضای مورد نظر یافت نشد' })
        return res.json({ status: 'ok', 'data': { demand: demandResource.make(req, demand) } })
    },

    getAll: async (req, res) => {
        let err = validator.check(req.body, {category_id: 'numeric|min:1'})
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0]})
        let offset = ((req.query.page ? req.query.page : 1) - 1) * 50;
        let whereClause = {}
        if (req.body.category_id)
            whereClause[category_id] = req.body.category_id
        if (req.body.search)
            whereClause[body] = {[Op.like]: `%${req.body.search}%`}
        let demands = Demand.findAndCountAll({
            where: whereClause,
            include: ['likes', 'category'],
            order:[['created_at', 'DESC']],
            offset: offset,
            limit: 50,
        })
        return res.json({status: 'ok', data: {demands: demands}})
    },

    addDemand: async (req, res) => {

    },

    banUser: async (req, res) => {
        //by demand id
    },

    delete: async (req, res) => {
        //by id
    },

    likeDemand: async (req, res) => {
        //by id
    },

    unlikeDemand: async (req, res) => {
        //by id
    },

    changeStatus: async (req, res) => {

    }

}