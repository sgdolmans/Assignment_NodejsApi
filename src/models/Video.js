const mongoose = require('mongoose');

const Video = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    data: { type: String, default: null },
    screenshot: { type: String, default: null }
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('Video', Video);
