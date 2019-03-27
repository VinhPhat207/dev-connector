const express = require("express");
const current = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Profile = mongoose.model("Profile");

current.get('/',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {        
        const errors = {};

        Profile
            .findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = "There is no profile for this user";
                    return res.status(404).json(errors);
                }

                res.json(profile);
            })
            .catch(err => res.status(400).json(err));
    });

module.exports = current;