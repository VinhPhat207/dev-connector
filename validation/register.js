var validator = require('validator');
const { isEmpty, validateIsEmpty, standardizedInput } = require('../utils');

module.exports = validateRegisterInput = (data, keys) => {
    var errors = {};

    data = standardizedInput(data, keys);

    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters.';
    }

    if (!validator.isLength(data.password, { min: 6, max: 30})) {
        errors.password = 'Password must be between 6 and 30 characters.';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid.';
    }

    if(!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Confirm password must be match.';
    }

    const keysValidateIsEmpty = ["name", "email", "password"]
    errors = { ...errors, ...validateIsEmpty(data, keysValidateIsEmpty)};

    return {
        errors,
        isValid: isEmpty(errors)
    }
}