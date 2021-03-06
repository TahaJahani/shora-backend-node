const { translate } = require('./translate')
const getError = (ruleName, ruleParam, key) => {
    const errors = {
        required: `${translate(key)} اجباری است`,
        numeric: `${translate(key)} باید عددی باشد`,
        min: `مقدار ${translate(key)} باید حداقل ${ruleParam} باشد`,
        max: `مقدار ${translate(key)} باید حداکثر ${ruleParam} باشد`,
        in: `مقدار ${translate(key)} یک مقدار معتبر نیست`,
        date: `${translate(key)} باید یک تاریخ معتبر باشد`,
        regex: `مقدار ${translate(key)} شکل معتبری ندارد`,
        confirmed: `دو مقدار ${translate(key)} هم‌خوانی ندارد`,
    }
    return errors[ruleName]
}

const ruleFunctions = {
    required: (data, key, param) => {
        if (data && key in data && data[key])
            return true;
        return false;
    },

    numeric: (data, key, param) => {
        if (data && data[key])
            return /\d+/.test(data[key])
        return true
    },

    min: (data, key, param) => {
        if (data && data[key]) {
            if (/\d+.?\d*/.test(data[key]))
                return parseFloat(data[key]) >= param
            return data[key].length >= param
        }
        return true
    },

    max: (data, key, param) => {
        if (data && data[key]) {
            if (/\d+.?\d*/.test(data[key]))
                return parseFloat(data[key]) <= param
            return data[key].length <= param
        }
        return true;
    },

    in: (data, key, param) => {
        if (data && data[key]) {
            param = param.split(',')
            return param.includes(data[key])
        }
        return true
    },

    date: (data, key, param) => {
        if (data && data[key]) {
            return new Date(data[key]) !== "Invalid Date"
        }
        return true
    },

    regex: (data, key, param) => {
        if (data && data[key]) {
            let reg = new RegExp(param)
            return reg.test(data[key])
        }
        return true
    },

    confirmed: (data, key, param) => {
        if (data && data[key])
            return data[key] === data[`${key}_confirmation`]
        return true
    }
}

module.exports = {
    check: (data, rules) => {
        let keys = Object.keys(rules)
        let result = []
        keys.forEach((key, index) => {
            keyRules = rules[key].split('|')
            keyRules.forEach((rule, index) => {
                ruleName = rule.split(":")[0]
                ruleParam = rule.split(":")[1]
                if (!ruleFunctions[ruleName](data, key, ruleParam))
                    result.push(getError(ruleName, ruleParam, key))
            })
        })
        return result;
    }
}