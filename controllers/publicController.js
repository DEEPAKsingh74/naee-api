require('dotenv').config()

const onBoardModel = require("../schemas/onboard.js")
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;
const client = require('twilio')(accountSid, authToken);
const jwt = require('jsonwebtoken');
const userModel = require("../schemas/user.js")
const organisationModel = require('../schemas/organisation.js');
const merchantModel = require('../schemas/merchant.js');
const offerModel = require('../schemas/offer.js');
const styleModel = require('../schemas/style.js');
const timeModel = require('../schemas/timing.js');
const reviewModel = require('../schemas/review.js');

const getOnboard = async (req, res) => {
	try {
		const onBoardData = await onBoardModel.find({}, "title description serial_number").exec();
		res.status(200).json({
			status: 200,
			data: onBoardData
		});
	} catch (err) {
		console.log("ONBOARD ERROR : ", err);
		res.status(400).json({ status: 401, message: "Some error occured" });
	}
};

const sendOTP = async (req, res) => {
	const { phone_number } = req.body.data;
	try {
		await client.verify
			.services(serviceId)
			.verifications.create({
				to: `${phone_number}`,
				channel: "sms",
			});
		res.status(200).json({
			status: 200,
			data: [{
				isSent: true,
				message: "Verification otp has been sent."
			}]
		});
	} catch (error) {
		res.status(error?.status || 400).json({ status: 400, message: "Some error occured" })
	}
};

const verifyOTP = async (req, res) => {
	const { phone_number, code } = req.body.data;
	try {
		const verifyResponse = await client.verify
			.services(serviceId)
			.verificationChecks.create({
				to: `${phone_number}`,
				code: code,
			});

		if (verifyResponse.status === 'approved' && verifyResponse.valid) {
			let user = null;
			const isUserAlreadyExists = await userModel.findOne({ phone_number: phone_number }).exec();
			if (isUserAlreadyExists) {
				user = isUserAlreadyExists;
			} else {
				user = await userModel.create({
					phone_number: phone_number
				});
			}
			if (user) {
				const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

				await userModel.updateOne({ _id: user._id }, { token: token });

				res.status(200).json({
					status: 200,
					data: [{
						isApproved: verifyResponse.status,
						valid: verifyResponse.valid,
						message: "Phone number verified.",
						token: token
					}]
				});
			} else {
				res.status(400).json({ status: 400, message: "Error creating user." })
			}
		} else {
			res.status(400).json({ status: 400, message: "Invalid verification code please check or try checking phone number." })
		}

	} catch (error) {
		res.status(error?.status || 400).json({ status: 400, message: "Some error occured", redirect: "phone number" })
	}
};


const getOrganisations = async (req, res) => {
	try {
		const organisations = await organisationModel.find({}, "organisation_name ratings contact.address").exec();
		if (organisations) {
			res.status(200).json({
				status: 200,
				data: organisations
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const getSpecialists = async (req, res) => {
	try {
		const specialists = await merchantModel.find({}, "username specialisation.name").exec();
		if (specialists) {
			res.status(200).json({
				status: 200,
				data: specialists
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const getOffers = async (req, res) => {
	try {
		const offers = await offerModel.find({}, "name price.discount").populate('organisation_relation', 'organisation_name').exec();
		if (offers) {
			res.status(200).json({
				status: 200,
				data: offers
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}

	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const getStyles = async (req, res) => {
	try {
		const styles = await styleModel.find({}, "name view").populate('organisation_relation', 'organisation_name').exec();
		if (styles) {
			res.status(200).json({
				status: 200,
				data: styles
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const getOrganisation = async (req, res) => {

	const id = req.params.id;
	try {
		const organisation = await organisationModel.findById(id, "organisation_name ratings isOpen").exec();
		if (organisation) {
			res.status(200).json({
				status: 200,
				data: organisation
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const getAbout = async (req, res) => {
	const id = req.params.id;
	try {
		const about = await organisationModel.findById(id, "about contact").populate("timing_relation").exec();
		if (about) {
			res.status(200).json({
				status: 200,
				data: about
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const getServices = async (req, res) => {
	const id = req.params.id;
	try {
		const services = await organisationModel.findById(id, 'offer merchant organisation_name').populate("merchant_relation", "specialisation.name").populate("offer_relation", "price name").exec();
		if (services) {
			res.status(200).json({
				status: 200,
				data: services
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const getGallery = async (req, res) => {
	try {
		const styles = await styleModel.find({}, "name view").populate('organisation_relation', 'organisation_name').exec();
		if (styles) {
			res.status(200).json({
				status: 200,
				data: styles
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const getReviews = async (req, res) => {
	const id = req.params.id;
	try {
		const reviews = await organisationModel
			.findById(id, 'review')
			.populate({
				path: 'review_relation',
				populate: {
					path: 'user_relation',
					model: 'user',
					select: 'phone_number'
				},
			})
			.exec();

		if (reviews) {
			res.status(200).json({
				status: 200,
				data: reviews
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const getOrganisationSpecialists = async (req, res) => {
	const id = req.params.id;
	try {
		const reviews = await organisationModel
			.findById(id, 'merchant organisation_name')
			.populate({
				path: 'merchant_relation',
				select: 'username specialisation'
			})
			.exec();

		if (reviews) {
			res.status(200).json({
				status: 200,
				data: reviews
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const getSpecialist = async (req, res) => {
	const id = req.params.id;
	try {
		const specialist = await merchantModel
			.findById(id, 'username gender age specialisation')
			.populate({
				path: 'organisation_relation',
				select: 'organisation_name about'
			})
			.exec();

		if (specialist) {
			res.status(200).json({
				status: 200,
				data: specialist
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}


const getOffer = async (req, res) => {
	const id = req.params.id;
	try {
		const offer = await offerModel
			.findById(id)
			.populate({
				path: 'organisation_relation',
				select: 'organisation_name'
			})
			.exec();

		if (offer) {
			res.status(200).json({
				status: 200,
				data: offer
			});
		} else {
			res.status(400).json({ status: 400, message: "Error getting the data." })
		}
	} catch (error) {
		console.log(error);
		res.send({ message: error })
	}
}

const register = async (req, res) => {
	const { username, gender, address } = req.body.data;

	try {
		const existingUser = await userModel.findOne({ username: username }).exec();

		if (existingUser) {
			res.status(200).json({
				status: 200,
				valid: false,
				message: "User already exists.",
			});
		} else {
			const newUser = await userModel.create({
				username: username,
				gender: gender,
				address: address,
			});

			res.status(200).json({
				status: 200,
				valid: true,
				data: newUser,
				message: "User registered successfully.",
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 500,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};




const setTiming = async (req, res) => {
	await timeModel.create({
		organisation_relation: '65649497a7933ab8cfb64023',
		weekdays: '7:00AM - 11:00AM  :: 12:00PM - 6:00PM',
		weekends: '7:00AM - 11:00AM',
		extra: 'Holiday on sunday.'
	});
	res.send({ message: "created.." })
}

module.exports = { getOnboard, sendOTP, verifyOTP, getOrganisations, getSpecialists, getOffers, getStyles, getOrganisation, getAbout, getServices, getGallery, getReviews, getOrganisationSpecialists, setTiming, getSpecialist, getOffer, register }