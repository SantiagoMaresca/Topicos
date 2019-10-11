const mongoose = require('mongoose');
var autoIncrement = require("mongodb-autoincrement");

var Schema = mongoose.Schema;

var OfferSchema = new Schema({
    id: { type: Number, unique: true, required: true, autogenerated: true},
    date: { type: Date, required: true },
    quantity: { type: Number, required: true },
    badge: { type: Number, required: true },
    user: { type: String, required: true } 
});

// Compile model from schema
module.exports = mongoose.model('Offer', OfferSchema);