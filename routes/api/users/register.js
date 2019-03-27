const gravatar = require('gravatar');
const express = require("express");
const register = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

//@input: name, email, password, password2
register.post('/', (req, res) => {
  const keysValidate = ["name", "email", "password", "password2"];
  const { errors, isValid } = validateRegisterInput(req.body, keysValidate);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, name, password } = req.body;

  User.findOne({ email })
    .then(user => {
      const avatar = gravatar.url(email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      if (user) {
        errors.email = "Email already exists.";
        return res.status(400).json(errors);
      }

      const newUser = new User({ name, email, avatar });
      newUser.password = newUser.encryptPassword(password);

      newUser
        .save()
        .then(user => res.json(user))
        .catch(console.log);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ msg: "Failure." });
    });
});

module.exports = register;
