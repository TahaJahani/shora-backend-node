const { translate } = require('./translate')
const getError = (rule, key) => {
    const errors = {
        required: `${translate(key)} اجباری است`,
    }
    return errors[rule]
}

const ruleFunctions = {
    required: (data, key) => {
        if (key in data && data[key])
            return true;
        return false;
    },

    numeric: (data, key) => {
        if (data[key])
            return /\d*/.test(data[key])
        return false
    }
}

module.exports = {
    check: (data, rules) => {
        let keys = Object.keys(rules)
        let result = []
        keys.forEach((key, index) => {
            keyRules = rules[key].split('|')
            keyRules.forEach((rule, index) => {
                if (!ruleFunctions[rule](data, key))
                    result.append(getError(rule, key))
            })
        })
        return result;
    }
}