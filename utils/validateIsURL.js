var validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateIsUrl = (data, keys) => {
    var errors = {};

    for (const key of keys) {        
        if (!isEmpty(data[key])) {
            if (!validator.isURL(data[key])) {
                errors[key] = 'NOT a valid URL.';
            }
        }
    }

    return errors;
};