const mongoose = require("mongoose");


const onBoardSchema = new mongoose.Schema({
	serial_number: {
		type: Number,
		unique : true
	},
	title: {
		type: String,
		default: ""
	},
	description: {
		type: String,
		default: ""
	}},
	{
		timestamps: true,
})

const onBoardModel = mongoose.model("onboard", onBoardSchema);

module.exports = onBoardModel;