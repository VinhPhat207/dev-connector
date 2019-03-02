var validator = require('validator');
const { isEmpty, validateIsEmpty, standardizedInput } = require('./middlewares');

module.exports = validateLoginInput = (data, keys) => {
    var errors = {};

    data = standardizedInput(data, keys);

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid.';
    }

    const keysValidateIsEmpty = ["email", "password"];
    errors = { ...errors, ...validateIsEmpty(data, keysValidateIsEmpty) };

    return {
        errors,
        isValid: isEmpty(errors)
    }
}