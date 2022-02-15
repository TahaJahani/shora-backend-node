const validator = require('../services/validator')
const {Transaction} = require('../database/sequelize')
const {Op} = require('sequelize')
module.exports = {
    getTransactions: (req, res, next) => {
        let err = validator.check(req.body, {
            from: 'date',
            to: 'date',
            type: 'in:deposit,withdraw'
        })
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]})
        
        let whereClause = {}
        if (req.body.from)
            whereClause.at = {[Op.gt]: req.body.from}
        if (req.body.to)
            whereClause.at = {[Op.lt]: req.body.to}
        if (req.body.type)
            whereClause.type = req.body.type
        let transactions = await Transaction.findAll({
            where: whereClause,
            attributes: ['id', 'amount', 'type', 'at', 'description']
        })
        return res.json({status: 'ok', data: {transactions: transactions}})
    },

    addTransaction: (req, res, next) => {
        let err = validator.check(req.body, {
            amount: 'required|numeric|min:0',
            description: 'required',
            type: 'required|in:deposit,withdraw',
            at: 'required|date',
        })
        if (err.length > 0)
            return res.json({status: 'error', message: err[0]})
        
        let transaction = await Transaction.create({
            amount: req.body.amount,
            description: req.body.description,
            type: req.body.type,
            at: req.body.at,
        })
        return res.json({status: 'ok', message: 'با موفقیت ثبت شد', data: {transaction: transaction}})
    },
}