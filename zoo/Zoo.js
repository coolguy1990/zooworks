const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const uuid = require('./uuid');

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/zoo');
autoIncrement.initialize(connection);

const zooSchema = new mongoose.Schema({
	name: String,
	city: String,
	state: String,
	state_short_code: String,
	animal_count: Number
});

zooSchema.plugin(autoIncrement.plugin, {
	model: 'Zoo',
	field: 'id'
});

zooSchema.plugin(uuid);

const Zoo = mongoose.model('Zoo', zooSchema);

module.exports = Zoo;