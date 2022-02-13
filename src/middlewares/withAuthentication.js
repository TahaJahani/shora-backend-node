const { User, PersonalAccessToken } = require('../database/sequelize')
var bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    let apiKey = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!apiKey) {
        return res.status(403).json({
            status: "error",
            message: "لطفا با حساب کاربری خود وارد سایت شوید"
        })
    }
    id = apiKey.split('|')[0]
    key = apiKey.split('|')[1]
    record = await PersonalAccessToken.findOne({ where: {id: id}});
    if (record && bcrypt.compareSync(key, record.token)) {
        user = await User.findOne({where: {id: record.user_id}})
        user.abilities = record.abilities.split(',')
        req.user = user;
        next()
    } else {
        return res.status(403).json({
            status: "error",
            message: "لطفا با حساب کاربری خود وارد سایت شوید"
        })
    }
}