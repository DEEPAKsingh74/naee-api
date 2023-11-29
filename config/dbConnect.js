const mongoose = require('mongoose');
require('dotenv').config();

main();

async function main() {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("DATA BASE CONNECTED.");
  } catch (err) {
    console.log("ERROR => ", err);
  }
}