const express = require("express");
const router = express.Router();

// @route   GET api/profile/current
// @desc    GET current user profile
// @access  Private
router.use("/current", require('./current'));

// @route   POST api/profile/create
// @desc    Create user profile
// @access  Private
router.use("/create", require('./create'));

// @route   POST api/profile/update
// @desc    Update user profile
// @access  Private
router.use("/update", require('./update'));

// @route   GET api/profile/handle/:handle
// @desc    GET profile by handle
// @access  Public
router.use('/handle', require('./handle'));

// @route   GET api/profile/user/:user
// @desc    GET profile by user
// @access  Public
router.use('/user', require('./user'));

// @route   GET api/profile/all
// @desc    GET all profiles
// @access  Public
router.use('/all', require('./all'));

module.exports = router;
