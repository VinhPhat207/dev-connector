const isEmpty = require('./isEmpty');

const standardizedInput = (data, keys) => {
    for (const key of keys) {
        if (isEmpty(data[key])) {
            data[key] = '';
        }
    }

    return data;
}

module.exports = standardizedInput;