const mongoose = require("mongoose");


const offerSchema = new mongoose.Schema({
	name: {
		type: String
	},
	organisation_relation: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'organisation'
	},
	price: {
		discount: {
			type: Number
		},
		before: {
			type: Number
		}
	},
	subtitle: {
		type: String
	},
	start: {
		time: { type: String },
		date: { type: String }
	},
	end: {
		time: { type: String },
		date: { type: String }
	},
	details: {
		type: String,
		required: true
	},
	terms: {
		type: String
	}

},
	{
		timestamps: true,
	}
)

const offerModel = mongoose.model("offer", offerSchema);

module.exports = offerModel;