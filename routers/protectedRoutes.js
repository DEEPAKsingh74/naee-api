const express = require('express');
const router = express.Router();
const {getProtectedData} = require('../controllers/protectedController.js');
const authenticateToken = require('../middlewares/AuthTokenVerify.js');

router.use(authenticateToken);
router.get('/', getProtectedData);

module.exports = router;
