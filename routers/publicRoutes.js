const express = require('express');
const router = express.Router();
const { getOnboard, sendOTP, verifyOTP, getOrganisations, getSpecialists, getOffers, getStyles, getOrganisation, getAbout, getServices, getGallery, getReviews, getOrganisationSpecialists, setTiming, getSpecialist, getOffer, register } = require('../controllers/publicController.js');

router.get('/onboard', getOnboard);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.get('/organisation', getOrganisations);
router.get('/organisation/:id', getOrganisation);
router.get('/timing', setTiming);
router.get('/organisation/:id/about', getAbout);
router.get('/organisation/:id/services', getServices);
router.get('/organisation/:id/gallery', getGallery);
router.get('/organisation/:id/reviews', getReviews);
router.get('/organisation/:id/specialists', getOrganisationSpecialists);
router.get('/specialists', getSpecialists);
router.get('/specialists/:id', getSpecialist);
router.get('/offers', getOffers);
router.get('/offers/:id', getOffer);
router.get('/styles', getStyles);
router.post('/register', register);

module.exports = router;
