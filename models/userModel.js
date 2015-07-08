var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    username: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    created: {type: Date},
    lastlogin: {type: Date},
    role: {type: String},
    active: {type: Boolean, default: true},
    subscription: {type: String},
    portraot: {type: String}

})

module.exports = mongoose.model('Users', userModel)