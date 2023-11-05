const mongoose = require('mongoose');

const importSchema = new mongoose.Schema({
  age: Number,
  date: Date,
  equipment: String,
  originDH: Number,
  origin: String,
  destinationDH: Number,
  destination: String,
  miles: Number,
  company: String,
  contact: String,
  length: String,
  weight: Number,
  rate: String,
});

const Import = mongoose.model('loads', importSchema);

module.exports = Import;
