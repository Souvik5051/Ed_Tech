const express=require('express');
const { totalUser, paymentUser } = require('../controllers/AdminControllers');
const router=express.Router();

router.get('/stats/users',totalUser);
router.get('/stats/paymentUser',paymentUser);
module.exports=router;