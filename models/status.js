const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../cfg/database');

// Status Schema
const StatusSchema = mongoose.Schema({
    _id: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    statusCode: {
        type: String,
        required: true
    }
});

const Status = module.exports = mongoose.model('status', StatusSchema, 'status');

module.exports.getAllStatus = function(callback) {
    console.log("Retrieving all status from db");
    var query = {};
    Status.find(query, callback);
}

