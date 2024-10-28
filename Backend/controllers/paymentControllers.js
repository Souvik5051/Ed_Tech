const Payment=require('../models/paymentModel');
const User=require('../models/userModels');
const AppError=require('../utills/errorUtill');
const {instance}=require('../config/razorpay');
const crypto=require('crypto');


// const Course = require("../models/Course")

// const User = require("../models/User")
// const mailSender = require("../utils/mailSender")



// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  
  const userId = req.user.id
  // if (courses.length === 0) {
  //   return res.json({ success: false, message: "Please Provide Course ID" })
  // }

  const options = {
    amount: 2* 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
 
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  try{
  const{id}=req.user;
  const user=await User.findById(id);
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  // const courses = req.body?.courses


  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !user
   
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature !== razorpay_signature) {
    return next(new AppError('Payment not verified please try again',400));
  }
  
  await Payment.create({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  })
  user.subscription.id=razorpay_payment_id;
  user.subscription.status='active'
  await user.save();

  return res.status(200).json({ success: true, message: "Payment Verified" })
}
catch(err){
  return res.status(200).json({ success: false, message: "Payment Failed" })
  
}
}




