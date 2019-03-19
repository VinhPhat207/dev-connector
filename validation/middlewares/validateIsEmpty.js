var validator = require('validator');

const validateIsEmpty = (data, keys) => {
    var errors = {};

    for (const key of keys) {        
        if (validator.isEmpty(data[key])) {
            errors[key] = key.charAt(0).toUpperCase() + key.slice(1) + " field is required.";
        }
    }

    return errors;
}

module.exports = validateIsEmpty;