const express = require("express");
const login = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("User");

const { secretOrKey } = process.env;

login.post("/", (req, res) => {
  const { email, password } = req.body;

  const keysValidate = ["email", "password"];
  const { errors, isValid } = validateLoginInput(req.body, keysValidate);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "Email not found.";
        return res.status(404).json(errors);
      }

      if (user.validPassword(password)) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) {
            return res.status(400).json({ msg: "Failure." });
          }

          res.json({ success: true, token: `Bearer ${token}` });
        });
      } else {
        errors.password = "Password incorrect.";
        return res.status(400).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ msg: "Failure." });
    });
});

module.exports = login;