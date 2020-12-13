
const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   description: { type: String },
   status: { type: String }
});

module.exports = mongoose.model('Item', itemSchema);