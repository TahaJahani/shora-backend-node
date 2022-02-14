const {DemandCategory} = require('../database/sequelize')
module.exports = {
    get: (req, res, next) => {
        let data = await DemandCategory.findAll();
        return res.json({status: 'ok', data: {categories: data}})
    }
}