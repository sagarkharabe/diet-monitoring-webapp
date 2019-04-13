const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MetricSchema = new Schema({
	age: {
		type: Number,
	},
	weight: {
		type: Number,
	},
	height: {
		type: Number,
	},
	userId: {
		type: String,
	},
	exclusions: {
		type: String,
	},
	dietType: {
		type: String,
	},
});

const Metric = mongoose.model("metric", MetricSchema);

module.exports = Metric;
