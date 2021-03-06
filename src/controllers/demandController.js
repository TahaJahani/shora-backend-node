const { Op } = require("sequelize")
const { Demand, Like, User, DemandCategory } = require("../database/sequelize")
const demandResource = require('../resources/demandResource')
const validator = require('../services/validator')
const redis = require('redis');

const client = redis.createClient({
    host: "host.docker.internal",
    port: "6379"
});

module.exports = {
    get: async (req, res) => {
        let err = validator.check(req.params, { id: 'required|numeric|min:1' })
        if (err.length > 0) {
            return res.json({ status: 'error', message: err[0] });
        }

        client.get('demand' + req.params.id, async (err, result) =>{
            if (err != null) {
                res.status(500).send(JSON.stringify(
                    {"error": err.message,}
                ));
            } else if (result == undefined || result == null) {
                let demand = await Demand.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: ['likes', 'category']
                })
                if (!demand) res.json({ status: 'error', message: 'تقاضای مورد نظر یافت نشد' });
                else {
                    client.set('demand' + req.params.id, JSON.stringify({ status: 'ok', 'data': { demand: demandResource.make(req, demand) } }), 'EX', 60 * 60 * 24);
                    res.json({ status: 'ok', 'data': { demand: demandResource.make(req, demand) } });
                }
            } else {
                res.json(JSON.parse(result));
            }
        });
    },

    getAll: async (req, res) => {
        let err = validator.check(req.body, { category_id: 'numeric|min:1' })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })
        let offset = ((req.query.page ? req.query.page : 1) - 1) * 50;
        let whereClause = {}
        if (req.body) {
            if (req.body.category_id)
                whereClause[category_id] = req.body.category_id
            if (req.body.search)
                whereClause[body] = { [Op.like]: `%${req.body.search}%` }
        }
        let demands = await Demand.findAndCountAll({
            where: whereClause,
            include: ['likes', 'category'],
            order: [['created_at', 'DESC']],
            offset: offset,
            limit: 50,
        })
        let hasNext = demands.count > offset + 50;
        let lastPage = Math.ceil(demands.count / 50);
        demands = demands.rows;
        return res.json({
            status: 'ok',
            data: {
                demands: demandResource.collection(req, demands),
                has_next: hasNext,
                last_page: lastPage,
            }
        })
    },

    addDemand: async (req, res) => {
        let err = validator.check(req.body, {
            body: 'required|max:500',
            category_id: 'required|numeric'
        })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })
        if (req.user.is_banned)
            return res.json({ status: 'error', message: 'حساب شما مسدود شده است. لطفا با مدیر وب‌سایت تماس بگیرید' })
        let demand = await Demand.create({
            user_id: req.user.id,
            category_id: req.body.category_id,
            status: 'pending',
            body: req.body.body,
        })
        demand.user = req.user
        demand.likes = []
        return res.json({ status: 'ok', data: { demand: demandResource.make(req, demand) } })
    },

    banUser: async (req, res) => {
        let err = validator.check(req.params, { demand_id: 'required|numeric|min:1' })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })
        let demand = await Demand.findOne({ where: { id: req.params.demand_id } })
        if (!demand)
            return res.json({ status: 'ok', message: 'تقاضای مورد نظر یافت نشد' })
        await User.update({ is_banned: 1 }, { where: { id: demand.user_id } })
        return res.json({ status: 'ok' })
    },

    delete: async (req, res) => {
        let err = validator.check(req.params, { id: 'required|numeric|min:1' })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })
        client.del('demand' + req.params.id);
        await Demand.destroy({ where: { id: req.params.id } })
        return res.json({ status: 'ok' })
    },

    likeDemand: async (req, res) => {
        let err = validator.check(req.params, { id: 'required|numeric|min:1' })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] })
        let demand = await Demand.findOne({ where: { id: req.params.id } })
        if (!demand)
            return res.json({ status: 'error', message: 'تقاضای مورد نظر یافت نشد' });
        try {
            client.del('demand' + req.params.id);
            await Like.create({
                user_id: req.user.id,
                likeable_id: demand.id,
                likeable_type: 'demand',
            })
            return res.json({status: 'ok'})
        } catch (e) {
            return res.json({status: 'error', message: 'شما قبلا این درخواست را لایک کرده‌اید'})
        }
    },

    unlikeDemand: async (req, res) => {
        let err = validator.check(req.params, { id: 'required|numeric|min:1' })
        if (err.length > 0)
            return res.json({ status: 'error', message: err[0] });
        client.del('demand' + req.params.id);
        await Like.destroy({
            where: {
                user_id: req.user.id,
                likeable_id: req.params.id,
                likeable_type: 'demand',
            }
        })
        return res.json({status: 'ok'})
    },

    changeStatus: async (req, res) => {
        let err = validator.check(req.body, {
            demand_id: 'required|numeric',
            status: 'required|in:pending,accepted,rejected'
        })
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]});
        client.del('demand' + req.params.id);
        await Demand.update({status: req.body.status}, {where: {id: req.body.demand_id}})
        return res.json({status: 'ok'})
    }

}