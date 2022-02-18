const validator = require('../services/validator')
const {Transaction} = require('../database/sequelize')
const {Op} = require('sequelize')
module.exports = {
    getTransactions: async (req, res, next) => {
        client.get('transactions', (err, result) => {
            if (err != null) {
                res.status(500).send(JSON.stringify(
                    {"error": err.message,}
                ));
            } else if (result == undefined || result == null) {
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
                client.set('transactions', JSON.stringify({status: 'ok', data: {transactions: transactions}}), 'EX', 60 * 60 * 24);
                res.json({status: 'ok', data: {transactions: transactions}})
            } else {
                res.json(JSON.parse(result));
            }
        });

        
    },

    addTransaction: async (req, res, next) => {
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

        client.del('transactions');
        return res.json({status: 'ok', message: 'با موفقیت ثبت شد', data: {transaction: transaction}})
    },
}