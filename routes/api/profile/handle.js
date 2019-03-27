const express = require("express");
const handle = express.Router();
const mongoose = require("mongoose");

const Profile = mongoose.model("Profile");

handle.get('/:handle', (req, res) => {    
    Profile
        .findOne({ handle: req.params.handle })
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

module.exports = handle;