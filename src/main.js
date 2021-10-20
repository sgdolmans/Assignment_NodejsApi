require('dotenv').config();

const express = require('express');
const app = express();
const { connectToDatabase } = require('./models');
const router = require('./routes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/users', router.users);
app.use('/videos', router.videos);

app.listen(PORT, () => {
  console.log(`Server: ${PORT}`);

  connectToDatabase();
});
