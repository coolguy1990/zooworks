const express = require('express');
const app = express();
const db = require('./db');

const zoo = require('./ZooController');

app.use('/zoo', zoo);

module.exports = app;