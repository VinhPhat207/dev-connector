const express = require("express");
const update = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Profile = mongoose.model("Profile");

const { getProfileFields } = require('../../../utils');

update.post(
    '/',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const keysValidate = ["handle", "status", "skills", "website", "youtube", "twitter", "facebook", "linkedin", "instagram"];
        const { errors, isValid } = validateProfileInput(req.body, keysValidate);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const profileFields = getProfileFields(req);

        Profile
            .findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )
            .then(profile => res.json(profile))
            .catch(err => res.status(400).json(err));
    }
);

module.exports = update;