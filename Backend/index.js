const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongo = require('./Models/SetDB');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const keepAlive = require('./keepAlive');

// keeping the backend alive
keepAlive.job.start();

app.use(cors({ origin: process.env.FrontEnd}));

// Limit the size of incoming requests to 50mb for image-upload and other large data
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended:true}));

// Mount all sub-routers to the apiRouter
app.get('/', (req, res) => {
  res.send('Welcome to the Petopia API!');
});
app.post('/', (req, res) => {
  res.send('Welcome to the Petopia API!');
});
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/user', require('./Routes/user'));
app.use('/api/vet', require('./Routes/vet'));
app.use('/api/trainer', require('./Routes/trainer'));
app.use('/api/pet', require('./Routes/pet'));
app.use('/api', require('./Routes/geminiWrapper'));
app.use('/api/upload', require('./Routes/upload'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/api`);
});
