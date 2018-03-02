const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../cfg/database');

var Schema = mongoose.Schema;
// Status Schema
const StatusSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
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
    var query = {};
    Status.find(query, callback);
}

