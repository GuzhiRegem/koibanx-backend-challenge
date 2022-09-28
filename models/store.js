const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: String,
  cuit: String,
  concepts: Array,
  currentBalance: Number,
  active: Boolean,
  lastSale: Date
}, { timestamps: true });

module.exports = mongoose.model('Store', StoreSchema);
