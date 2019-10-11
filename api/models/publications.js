const mongoose = require('mongoose');
var autoIncrement = require("mongodb-autoincrement");

var Schema = mongoose.Schema;

var PublicationSchema = new Schema({
    date: { type: Date, default: Date.now },
    quantity: { type: Number, required: true },
    badge: { type: Number, required: true },
    place: { type: String, required: true },
    user: { type: String, required: true }
});

// Compile model from schema
module.exports = mongoose.model('Publication', PublicationSchema );