const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	phone_number: {
		type: String,
	},
	gender: {
		type: String,
		default: "M"
	},
	age: {
		type : Number,
		max : 100
	},
	address: {
		type: String
	},
	total_money_spent: {
		type : Number,
		default : 0.00
	},
	token : {
		type : String,
	}

},
	{
		timestamps: true,
	}
)

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;