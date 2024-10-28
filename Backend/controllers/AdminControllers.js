const User=require('../models/userModels');
const AppError=require('../utills/errorUtill');

exports.totalUser=async(req,res,next)=>{
    try{
        const userCount = await User.countDocuments();
        // console.log(userCount);

        res.status(200).json({ 
            count: userCount 
        });
    }catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}

exports.paymentUser=async(req,res,next)=>{
    try{
        const purchasedUserCount = await User.countDocuments({ 'subscription.status': 'active' });
        // console.log(purchasedUserCount);
        res.status(200).json({ 
            count: purchasedUserCount 
        });
    }catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}