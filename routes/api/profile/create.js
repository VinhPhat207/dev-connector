const express = require("express");
const create = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Profile = mongoose.model("Profile");

const { getProfileFields } = require('../../../utils');

create.post(
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
            .findOne({ handle: profileFields.handle })
            .then(profile => {
                if (profile) {
                    errors.handle = 'That handle already exists.';
                    res.status(400).json(errors);
                } else {
                    new Profile(profileFields)
                        .save()
                        .then(profile => res.json(profile))
                        .catch(err => res.status(400).json(err));
                }
            })
            .catch(err => res.status(400).json(err));
    }
);

module.exports = create;