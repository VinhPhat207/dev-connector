var validator = require('validator');

module.exports = validateIsEmpty = (data, keys) => {
    var errors = {};

    for (const key of keys) {        
        if (validator.isEmpty(data[key])) {
            errors[key] = key.charAt(0).toUpperCase() + key.slice(1) + " field is required.";
        }
    }

    return errors;
};