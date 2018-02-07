const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
// const uuid = require('./uuid');
const uuid = require('mongoose-simple-uuid');

const connection = mongoose.createConnection('mongodb://mongo:27017/zoo');
autoIncrement.initialize(connection);

const AnimalSchema = new mongoose.Schema({
	name: String,
	zoological_name: String,
	family: String,
	status: String,
	zoos: Array
});

AnimalSchema.plugin(autoIncrement.plugin, {
	model: 'Animal',
	field: 'id'
});

AnimalSchema.plugin(uuid, {format: 'v4', hyphen: false});

const Animal = mongoose.model('Animal', AnimalSchema);

module.exports = Animal;