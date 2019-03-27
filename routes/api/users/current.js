const express = require("express");
const current = express.Router();
const passport = require("passport");

current.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;
    res.json({ id, name, email });
  }
);

module.exports = current;
