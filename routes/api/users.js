const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

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
            } else {
                const newUser = new User({ name, email, avatar });
                newUser.password = newUser.encryptPassword(password);

                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(console.log)
            }
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
            } else {
                if (user.validPassword(password)) {
                    res.json({msg: 'Success.'});
                } else {
                    return res.status(400).json({password: 'Password incorrect.'})
                }
            }
        })
})

module.exports = router;
