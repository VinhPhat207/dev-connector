const express = require('express');
const router = express.Router();

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.use('/register', require('./register'));

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.use('/login', require('./login'));

// @route   GET api/users/current
// @desc    Returing current user
// @access  Private
router.use('/current', require('./current'));

module.exports = router;
