const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../cfg/database');
const User = require('../models/user');

// Register (/users)
router.post('/register', function (req, res) {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    if (!newUser.password) {
        res.json({ success: false, msg: 'Password cannot be empty.' });
    }
    else {
        User.addUser(newUser, function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'Failed to register user' });
            } else {
                res.json({ success: true, msg: 'User registered' });
            }
        });
    }

});

// Authenticate
router.post('/authenticate', function (req, res) {

    const username = req.body.username;
    const password = req.body.password;
    console.log('Username passed: ' + req.body);
    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.json({ success: false, msg: 'Username not found!' });
        } else {
            const userFound = {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign(userFound, config.secret, {
                        expiresIn: 604800 // 1 week long
                    });
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: userFound
                    });
                } else {
                    return res.json({ success: false, msg: 'Incorrect password!' });
                }
            });

        }
    });

});

// Profile by username
router.get('/profile/:username', passport.authenticate('jwt', { session: false }), function (req, res) {
    User.getUserByUsername(req.params.username, function (err, user) {
        if (err) throw err;

        if (!user) {

            return res.json({ success: false, msg: 'Username not found!' });
        } else {
            user.password = ''; // hide password before returning
            res.json({
                user: user,
                success: true
            });
        }

    });

});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;
