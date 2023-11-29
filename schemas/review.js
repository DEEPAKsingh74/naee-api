const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
	user_relation : {type : mongoose.Schema.Types.ObjectId, ref : "user"},
	comment : {
		type : String
	},
	ratings : {
		type : Number,
		default : 5.0
	}
},
	{
		timestamps: true,
	}
)

const reviewModel = mongoose.model("review", reviewSchema);

module.exports = reviewModel;