const {Demand, Like, User, DemandCategory} = require("../database/sequelize")
const demandResource = require('../resources/demandResource')
module.exports = {
    get: async (req, res) => {
        let demand = Demand.findOne({
            where: {
                id: req.params.id
            },
            include: [Like, DemandCategory]
        })
        if (!demand)
            return res.json({status: 'error', message: 'تقاضای مورد نظر یافت نشد'})
        return res.json({status: 'ok', 'data': {demand: demandResource.make(demand)}})
    },

    getAll: async (req, res) => {
        
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