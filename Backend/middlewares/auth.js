//authentication check
const AppError=require('../utills/errorUtill');
const jwt=require('jsonwebtoken');
const User=require('../models/userModels');

exports.isLoggedIn=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new AppError("Unauthenticated,please login again",401))
    }
    const payload=await jwt.verify(token,process.env.JWT_SECRET);

    req.user=payload;
    next();
}

exports.authorizedRoles=(...roles)=>async(req,res,next)=>{
    const currentRole=req.user.role;
    if(!roles.includes(currentRole)){
        return next(new AppError("You do not have permission to access this route",401))
    }
    next();
}

exports.authorizedSubscriber=async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    if(user.role!=='ADMIN' || user.subscription.status!=='active'){
        return next(new AppError("Please subscribe to access this role!",403))
    }
    next();
}
