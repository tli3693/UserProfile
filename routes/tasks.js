const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../cfg/database');
const Task = require('../models/task');
const Status = require('../models/status');

// TODO
router.post('/add', function (req, res) {
    console.log("DEBUG 1: " + req);
    console.log("DEBUG 2: " + req.body);
    let newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        user_username: req.body.user_username,
        statusCode: req.body.statusCode
    });

    console.log("DEBUG: New task object: " + newTask);
    if (!newTask) {
        res.json({ success: false, msg: 'Task was empty.' });
    }
    else {
        Task.addTask(newTask, function (err, task) {
            if (err) {
                res.json({ success: false, msg: 'Failed to add new task' });
            } else {
                res.json({ success: true, msg: 'Task added: ' + task.name });
            }
        });
    }

});

// Find all tasks (working)
router.post('/findAllTasks', function (req, res) {
    const username = req.body.username;

    Task.getTasksByUsername(username, function (err, userTasks) {
        if (err) throw err;
        if (userTasks) {
            res.json({ success: true, msg: "Successfully retrieved tasks for " + username + ".", tasksList: userTasks });
        }
        else {
            res.json({ success: true, msg: "Failed to retrieve tasks for " + username + "." });
        }
    });

});

// TODO
router.get('/remove', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

// Get task status by code
router.get('/getAllTaskStatuses', function (req, res) {
    Status.getAllStatus(function (err, statusArray) {
        if (err) throw err;
        if (statusArray) {
            res.json({ success: true, msg: "Successfully retrieved statuses.", statusArray: statusArray });
        }
        else {
            res.json({ success: true, msg: "Failed to retrieve statuses" });
        }
    });

});

// Update Task
router.post('/update', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log("Updating task!!!");
    let task = new Task({
        name: req.body.task.name,
        description: req.body.task.description,
        dueDate: req.body.task.dueDate,
        status: req.body.task.status,
        user_username: req.body.task.user_username
    });
    let id = req.body.task._id;

    Task.saveOrUpdate(id, task, function (err, task) {
        if (err) {
            console.log('Error occurred while saving task:' + err );
            res.json({ success: false, msg: 'Error occurred while saving task:' + err });
        } else {
            res.json({ success: true, msg: 'Task saving successfully.' });
        }
    });
});

module.exports = router;
