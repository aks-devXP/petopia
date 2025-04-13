const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongo = require('./Models/SetDB');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: process.env.FrontEnd}));

// Mount all sub-routers to the apiRouter
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/user', require('./Routes/user'));
app.use('/api/vet', require('./Routes/vet'));
app.use('/api/trainer', require('./Routes/trainer'));
app.use('/api/pet', require('./Routes/pet'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/api`);
});
