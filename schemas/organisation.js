const mongoose = require("mongoose");


const organisationSchema = new mongoose.Schema({

	organisation_name: {
		type: String,
		required: true
	},
	offer : {
		count : {
			type : String, default : 0
		},
		status : {
			type : Boolean, default : false
		}
	},
	offer_relation : [{type : mongoose.Schema.Types.ObjectId, ref : 'offer'}],
	contact : {
		phone_number: {
			type : String
		},
		email : {
			type : String
		},
		address : {
			type : String
		}
	},
	merchant : {
		count : {
			type : Number
		}
	},
	merchant_relation : [{type : mongoose.Schema.Types.ObjectId, ref : 'merchant'}],
	styles : {
		count : {
			type : Number
		}
	},
	style_relation : [{type : mongoose.Schema.Types.ObjectId, ref : 'style'}],
	about : {
		type : String
	},
	ratings : {
		type : Number
	},
	isOpen : {
		type : Boolean
	},
	review : {
		count : {
			type : Number
		}
	},
	review_relation : [{type : mongoose.Schema.Types.ObjectId, ref : 'review'}],
	timing_relation : {type : mongoose.Schema.Types.ObjectId, ref : 'timing'}
	
},
	{
		timestamps: true,
	}
)

const organisationModel = mongoose.model("organisation", organisationSchema);

module.exports = organisationModel;