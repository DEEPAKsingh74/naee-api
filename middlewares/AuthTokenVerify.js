const jwt = require('jsonwebtoken');
require('dotenv').config()

const Authenticate = (req, res, next) => {
	// SEND RESPONSE LIKE THIS

	// const response = await axios.get('http://localhost:3001/api/secure-data', {
	//       headers: {
	//         Authorization: `Bearer ${token}`,
	//       },
	//     });

	const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
	if (!token) {
		return res.status(401).json({ status: 401, message: 'Unauthorized' });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ status: 401, message: 'Invalid token' });
		}
		req.userId = decoded.userId;
	});

	next();
};

module.exports = Authenticate;
