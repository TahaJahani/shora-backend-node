const { translate } = require('./translate')
const getError = (ruleName, ruleParam, key) => {
    const errors = {
        required: `${translate(key)} اجباری است`,
        numeric: `${translate(key)} باید عددی باشد`,
        min: `مقدار ${translate(key)} باید حداقل ${ruleParam} باشد`,
    }
    return errors[ruleName]
}

const ruleFunctions = {
    required: (data, key, param) => {
        if (key in data && data[key])
            return true;
        return false;
    },

    numeric: (data, key, param) => {
        if (data[key])
            return /\d+/.test(data[key])
        return true
    },

    min: (data, key, param) => {
        if (data[key]) {
            if (/\d+.?\d*/.test(data[key]))
                return parseFloat(data[key]) >= param
            return data[key].length >= param
        }
        return true
    },
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