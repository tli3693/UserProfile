const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../cfg/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
                console.log("Error while hashing password: " + err);
                throw err;
            }
            else {
                newUser.password = hash;
                newUser.save(callback);
            }
        })
    });
}

// candidatePassword = entered password
module.exports.comparePassword = function (candidatePassword, hashPassword, callback) {
    bcrypt.compare(candidatePassword, hashPassword, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });

}
