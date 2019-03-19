var validator = require('validator');
const isEmpty = require('./isEmpty');

const validateIsUrl = url = (data, keys) => {
    var errors = {};

    for (const key of keys) {        
        if (!isEmpty(data[key])) {
            if (!validator.isURL(data[key])) {
                errors[key] = 'NOT a valid URL.';
            }
        }
    }

    return errors;
}

module.exports = validateIsUrl;