const mongoose = require("mongoose");


const styleSchema = new mongoose.Schema({

	name: {
		type: String
	},
	view: {
		type: Number
	},
	gender: {
		type: String
	},
	organisation_relation: { type: mongoose.Schema.Types.ObjectId, ref: 'organisation' }

},
	{
		timestamps: true,
	}
)

const styleModel = mongoose.model("style", styleSchema);

module.exports = styleModel;