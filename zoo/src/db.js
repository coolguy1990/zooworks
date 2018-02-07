const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/zoo');

module.exports = mongoose;