const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Session schema options
const options = {
    toObject: {
        getters: false,
        setters: false,
        virtuals: false
    },
    toJSON: {
        getters: false,
        setters: false,
        virtuals: false
    },
    _id: false
};

// User Session schema definitions
const definitions = {
    refreshToken: {
        default: '',
        type: String,
    },
    deviceToken: {
        default: '',
        type: String
    },
    createdAt: {
        type: Date,
        select: false,
        default: Date.now
    }
};

const UserSessionSchema = new Schema(definitions, options);

module.exports = UserSessionSchema;
