var validator = require('validator');
const { isEmpty } = require('../middlewares');

module.exports = validateRegisterInput = (data) => {
    var errors = {};

    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}