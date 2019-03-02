var validator = require('validator');

const validateIsEmpty = (data, keysValidateIsEmpty) => {
    var errors = {};

    for (const key of keysValidateIsEmpty) {        
        if (validator.isEmpty(data[key])) {
            errors[key] = key.charAt(0).toUpperCase() + key.slice(1) + " field is required.";
        }
    }

    return errors;
}

module.exports = validateIsEmpty;