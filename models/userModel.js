var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    username: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    created: {type: Date, default: new Date()},
    lastlogin: {type: Date, default: null},
    role: {type: String},
    active: {type: Boolean, default: true},
    subscription: {type: String},
    portrait: {type: String}

})

module.exports = mongoose.model('User', userModel)