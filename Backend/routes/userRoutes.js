const express=require('express');
const router=express.Router();
const {isLoggedIn}=require('../middlewares/auth');

//user related handler
const {register,login,logout,getProfile,forgotPassword,resetPassword,changePassword,updateUser}=require('../controllers/userControllers');
const upload=require('../middlewares/multerMiddleware');

router.post('/register',upload.single("avatar"),register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn,getProfile);
router.post('/reset',forgotPassword);
router.post('/reset/:resetToken',resetPassword);
router.post('/change-password',isLoggedIn,changePassword);
router.put('/update/:id',isLoggedIn,upload.single("avatar"),updateUser)

module.exports=router;

