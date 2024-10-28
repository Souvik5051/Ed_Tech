const express=require('express');
const router=express.Router();

// const {getRazorpayApiKey,buySubscription,verifySubscription,cancelSubscription,getAllPayment}=require('../controllers/paymentControllers');
const {isLoggedIn,authorizedRoles, authorizedSubscriber}=require('../middlewares/auth');

// router.route('/razorpay-key')
//       .get(isLoggedIn,getRazorpayApiKey)

// router.route('/subscribe')
//       .post(isLoggedIn,buySubscription)

// router.route('/verify')
//       .post(isLoggedIn,verifySubscription)

// router.route('/unsubscribe')
//       .post(isLoggedIn,authorizedSubscriber ,cancelSubscription)

// router.route('/')
//       .get(isLoggedIn,authorizedRoles('ADMIN'),getAllPayment)


//code help

const {
  capturePayment,
  // verifySignature,
  verifyPayment,
 
} = require("../controllers/paymentControllers")

router.post("/capturePayment", isLoggedIn, capturePayment)
router.post("/verifyPayment", isLoggedIn, verifyPayment)




module.exports=router;