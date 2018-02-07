const express = require('express');
const app = express();
const db = require('./db');

const animal = require('./AnimalController');

app.use('/animal', animal);

module.exports = app;