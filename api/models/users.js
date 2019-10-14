const mongoose = require('mongoose');
var autoIncrement = require("mongodb-autoincrement");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String},
    phone: { type: String},
    score: { type: Number, required: true, default: 0}
});


// Compile model from schema
module.exports = mongoose.model('User', UserSchema);