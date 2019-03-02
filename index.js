const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// env
const {MONGO_URI, PORT} = process.env;

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true})
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
    })
    .catch(err => console.log("Connect to MongoDB with Error Message: ", err.errmsg));