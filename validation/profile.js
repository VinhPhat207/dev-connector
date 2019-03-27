var validator = require('validator');
const { isEmpty, validateIsEmpty, validateIsURL, standardizedInput } = require('../utils');

module.exports = validateProfileInput = (data, keys) => {
    var errors = {};

    data = standardizedInput(data, keys);

    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to between 2 and 4 characters.';
    }

    const keysValidateIsEmpty = ["handle", "status", "skills"];
    const keysValidateIsURL = ["website", "youtube", "twitter", "facebook", "linkedin", "instagram"];

    errors = { ...errors, ...validateIsEmpty(data, keysValidateIsEmpty), ...validateIsURL(data, keysValidateIsURL) };

    return {
        errors,
        isValid: isEmpty(errors)
    }
}