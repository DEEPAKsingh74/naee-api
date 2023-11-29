const mongoose = require("mongoose");


const merchantSchema = new mongoose.Schema({
	organisation_relation: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'organisation'
	},
	username: {
		type: String,
		unique: true
	},
	phone_number: {
		type: String,
		unique: true,
		required: true
	},
	gender: {
		type: String,
		default: "M"
	},
	age: {
		type: Number,
		max: 100
	},
	address: {
		type: String
	},
	booking_count : {
		type : Number
	},
	specialisation : [
		{
			name : {type : String},
			price : {type : Number}
		}
	]

},
	{
		timestamps: true,
	}
)

const merchantModel = mongoose.model("merchant", merchantSchema);

module.exports = merchantModel;