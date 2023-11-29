const mongoose = require("mongoose");


const timeSchema = new mongoose.Schema({
	
	weekdays: {
		type: String
	},
	weekends: {
		type: String
	},
	extra: {
		type: String,
		default: "Holiday"
	}
},
	{
		timestamps: true,
	}
)

const timeModel = mongoose.model("timing", timeSchema);

module.exports = timeModel;