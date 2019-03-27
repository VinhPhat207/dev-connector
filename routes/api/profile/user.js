const express = require("express");
const user = express.Router();
const mongoose = require("mongoose");

const Profile = mongoose.model("Profile");

user.get('/:user_id', (req, res) => {
    Profile
        .findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            const errors = {};

            if (!profile) {
                errors.noprofile = 'There is no profile for this user.';
                return res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

module.exports = user;