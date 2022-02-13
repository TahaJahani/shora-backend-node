const { Demand, Like, User, DemandCategory } = require("../database/sequelize")
const demandResource = require('../resources/demandResource')
const validator = require('../services/validator')

module.exports = {
    get: async (req, res) => {
        let err = validator.check(req.params, { id: 'required|numeric' })
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
        let err = validator.check(req.body, {category_id: 'numeric'})
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0]})
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