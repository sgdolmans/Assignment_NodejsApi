const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    name: { type: String, default: null }
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('User', User);
