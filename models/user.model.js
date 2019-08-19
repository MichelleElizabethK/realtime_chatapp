const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSessionSchema = require('./userSession.model');

// User schema options
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
    _id: true
};

// User schema definitions
const definitions = {
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        trim: true,
        default: ' '
    },
    state: {
        type: String,
        trim: true,
        default: ' '
    },
    sessions: {
        type: [userSessionSchema],
        default: [userSessionSchema]
    },
    userStatus: {
        type: Number,
        required: true,
        default: 1
    },
    online:{
        type: Boolean,
        default: false
    },
    image:{
        type: String,
        default:'default.jpg'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    isDeleted:{
        type: Boolean, 
        required: true,
        default:false
    }
};

const UserSchema = new Schema(definitions, options);
module.exports = mongoose.model('users', UserSchema); 

