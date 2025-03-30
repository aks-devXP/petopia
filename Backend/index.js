const exp = require('express');
const app = exp();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongo = require('./Models/SetDB');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
} );
app.use(bodyParser.json());
app.use(cors("http://localhost:5173/"));

app.use('/auth', require('./Routes/auth'));
app.use('/user',require('./Routes/user'));
app.use('/vet',require('./Routes/vet'));


