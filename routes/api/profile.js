const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

// Load Model
const User = mongoose.model("User");
const Profile = mongoose.model("Profile");

// Middlewares
const { getProfileFields } = require('./middlewares');

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res, next) => res.json({ msg: "Users works." }));

// @route   GET api/profile
// @desc    GET current user profile
// @access  Private
router.get(
    "/",
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
    }
);

// @route   POST api/profile
// @desc    Create/Update user profile
// @access  Private
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const keysValidate = ["handle", "status", "skills", "website", "youtube", "twitter", "facebook", "linkedin", "instagram"];
        const { errors, isValid } = validateProfileInput(req.body, keysValidate);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const profileFields = getProfileFields(req);

        Profile
            .findOne({ user: req.user.id })
            .then(profile => {                
                if (profile) {
                    //Update
                    Profile
                        .findOneAndUpdate(
                            { user: req.user.id },
                            { $set: profileFields },
                            { new: true }
                        )
                        .then(profile => {
                            console.log(profile);
                            res.json(profile)
                        })
                        .catch(err => res.status(400).json(err));
                } else {
                    // Create
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
                            }
                        })

                }
            })
    }
);

// @route   GET api/profile/handle/:handle
// @desc    GET profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
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

// @route   GET api/profile/user/:user
// @desc    GET profile by user
// @access  Public
router.get('/user/:user_id', (req, res) => {
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

// @route   GET api/profile/all
// @desc    GET profiles
// @access  Public
router.get('/all', (req, res) => {
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

module.exports = router;
