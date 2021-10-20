const mongoose = require('mongoose');

const User = require('./User');
const Video = require('./Video');

const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const connectToDatabase = async () => {
  try {
    const { MONGO_URI } = process.env;

    // Connecting To MongoDB
    const { connection } = await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

    // Checking If Connection Is Set up
    if (connection.readyState == 1) console.log(`MongoDB: ${MONGO_URI}`);

    connection.on('error', e => console.log(e));
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  connectToDatabase,
  User,
  Video
};
