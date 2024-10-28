const Razorpay=require('razorpay');
require('dotenv').config();

const instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_SECRET,
});

// console.log("Razorpay Instance Initialized:", instance); // Debugging line
// console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID); // Debugging line
// console.log("Razorpay Secret:", process.env.RAZORPAY_SECRET); // Debugging line
module.exports={instance};