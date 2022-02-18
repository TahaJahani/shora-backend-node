const {DemandCategory} = require('../database/sequelize')
module.exports = {
    get: async (req, res, next) => {
        client.get("categories", async (err, result) => {
            if (err != null) {
                res.status(500).send(JSON.stringify(
                    {"error": err.message,}
                ));
            } else if (result == undefined || result == null) {
                let data = await DemandCategory.findAll();
                client.set("categories", JSON.stringify({status: 'ok', data: {categories: data}}), 'EX', 60 * 60 * 24);
                return res.json({status: 'ok', data: {categories: data}})
            } else {
                res.json(JSON.parse(result));
            }
        });
    }
}