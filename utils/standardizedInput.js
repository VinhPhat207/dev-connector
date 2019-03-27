const isEmpty = require('./isEmpty');

module.exports = standardizedInput = (data, keys) => {
    for (const key of keys) {
        if (isEmpty(data[key])) {
            data[key] = '';
        }
    }

    return data;
};