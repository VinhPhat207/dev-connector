const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');

// env 
const { secretOrKey } = process.env;

// Load model
const User = mongoose.model('User');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Users works." }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res, next) => {
    const { email, name, password } = req.body;

    const keysValidate = ["name", "email", "password", "password2"];
    const { errors, isValid } = validateRegisterInput(req.body, keysValidate);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User
        .findOne({ email })
        .then(user => {
            const avatar = gravatar.url(email, {
                s: '200',   // Size
                r: 'pg',    // Rating
                d: 'mm'     // Default
            })

            if (user) {
                errors.email = 'Email already exists.';
                return res.status(400).json(errors);
            }

            const newUser = new User({ name, email, avatar });
            newUser.password = newUser.encryptPassword(password);

            newUser
                .save()
                .then(user => res.json(user))
                .catch(console.log)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: 'Failure.' })
        });
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const keysValidate = ["email", "password"];
    const { errors, isValid } = validateLoginInput(req.body, keysValidate);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'Email not found.';
                return res.status(404).json(errors)
            }

            if (user.validPassword(password)) {
                const payload = { id: user.id, name: user.name, avatar: user.avatar }
                
                jwt.sign(
                    payload,
                    secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) {
                            return res.status(400).json({ msg: 'Failure.' })
                        }

                        res.json({ success: true, token: `Bearer ${token}` })
                    });
            } else {
                errors.password = 'Password incorrect.';
                return res.status(400).json(errors);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: 'Failure.' })
        });
});

// @route   GET api/users/current
// @desc    Returing current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;
