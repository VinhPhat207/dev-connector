const express = require("express");
const all = express.Router();
const mongoose = require("mongoose");

const Profile = mongoose.model("Profile");

all.get('/', (_, res) => {
    Profile
        .find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            const errors = {};

            if (!profiles) {
                errors.noprofile = 'There are no profiles.';
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json(err));
});

module.exports = all;