const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use('/github', require('./routes/github'));
app.use('/lastfm', require('./routes/lastfm'));

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Running on port ${port}`);