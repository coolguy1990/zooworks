const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
// const uuid = require('./uuid');
const uuid = require('mongoose-simple-uuid');

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/zoo');
autoIncrement.initialize(connection);

const ZooSchema = new mongoose.Schema({
	name: String,
	city: String,
	state: String,
	state_short_code: String,
	animal_count: Number
});

ZooSchema.plugin(autoIncrement.plugin, {
	model: 'Zoo',
	field: 'id'
});

ZooSchema.plugin(uuid, {format: 'v4', hyphen: false});

const Zoo = mongoose.model('Zoo', ZooSchema);

module.exports = Zoo;