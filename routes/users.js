const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Register (/users)
router.post('/register', function(req, res) {
    console.log("DEBUG 1: " + req);
    console.log("DEBUG 2: " + req.body);
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    
    console.log("DEBUG: New user object: " + newUser);
    if(!newUser.password) {
        res.send('Password cannot be empty!');
    }
    else {
        User.addUser(newUser, function(err, user) {
            if(err) {
                res.send('Error while registering user!');
            } else {
                res.send('Registered user!');
            }
        });
    }

});

// Authenticate
router.post('/authenticate', function(req, res) {
    res.send('Authenticate user!');
});

// Profile
router.get('/profile', function(req, res) {
    res.send('User profile');
});

module.exports = router;
