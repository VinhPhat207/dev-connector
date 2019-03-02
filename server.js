const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const fs = require('fs');

// env
const { MONGO_URI, PORT } = process.env;

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Connect to MongoDB with Error Message: ", err.errmsg));

// Require all models
const modelsPath = path.join(__dirname, "./models");
fs.readdirSync(modelsPath).map(file => {
    require('./models/' + file);
});

// Require all routers
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Load Validation
require('./validation');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./configs/passport')(passport);


// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));