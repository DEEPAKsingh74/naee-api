const express = require('express');
const http = require('http');
const publicRoutes = require('./routers/publicRoutes');
const protectedRoutes = require('./routers/protectedRoutes');
const bodyParser = require('body-parser');
// const client = require('twilio')(accountSid, authToken);
const mongoose = require('./config/dbConnect.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3001

require('dotenv').config()
const app = express();
const server = http.createServer(app);
mongoose;

app.use(cors());
app.use(bodyParser.json());
app.use('/public', publicRoutes);
app.use('/protected', protectedRoutes);

app.get("/test", (req, res)=>{
	const token = jwt.sign({phone : '+91672364234'}, process.env.JWT_SECRET, { expiresIn: '7d' })
	res.send({token});
})


server.listen(PORT, (err)=>{
	console.log("successfully listening on port: ", PORT);
})