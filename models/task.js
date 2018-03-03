const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../cfg/database');

var Schema = mongoose.Schema;

Status = require('./status');
// Task Schema
const TaskSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_username: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    statusCode: String, // TODO: Remove statusCode as it is not needed; replaced by status(joining)
    status: { type: Schema.Types.ObjectId,
        ref: 'status'
    }
});

const Task = module.exports = mongoose.model('task', TaskSchema);

module.exports.getTaskByName = function(name, callback) {
    Task.findById(name, callback);
}

module.exports.getTasksByUsername = function(username, callback) {
    const query = {user_username: username};

    Task.find(query, callback).populate('status').exec(function (err, tasks) {
        if (err) return handleError(err);
    });
}

module.exports.addTask = function(newTask, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newTask.password, salt, function(err, hash) {
            if(err) {
                console.log("Error while hashing password: " + err);
                throw err;
            }
            else {
                newTask.password = hash;
                newTask.save(callback);
            }
        })
    });
}

// candidatePassword = entered password
module.exports.updateTask = function(candidatePassword, hashPassword, callback) {
    bcrypt.compare(candidatePassword, hashPassword, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });

}
