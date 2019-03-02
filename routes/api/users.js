const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

// Load model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Users works." }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res, next) => {
    const { email, name, password } = req.body;

    User
        .findOne({ email })
        .then(user => {
            const avatar = gravatar.url(email, {
                s: '200',   // Size
                r: 'pg',    // Rating
                d: 'mm'     // Default
            })
            
            if (user) {
                return res.status(400).json({ email: 'Email already exists.' })
            }

            const newUser = new User({ name, email, avatar });
            newUser.password = newUser.encryptPassword(password);

            newUser
                .save()
                .then(user => res.json(user))
                .catch(console.log)
        })
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'Email not found.' })
            }

            if (user.validPassword(password)) {
                const payload = { id: user.id, name: user.name, avatar: user.avatar }
                jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) {
                            return res.status(400).json({ msg: 'Failure.' })
                        }

                        res.json({ success: true, token: `Bearer ${token}` })
                    });
            } else {
                return res.status(400).json({ password: 'Password incorrect.' })
            }
        })
})

module.exports = router;
