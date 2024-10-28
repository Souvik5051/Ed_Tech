const User=require('../models/userModels');
const AppError = require("../utills/errorUtill");
const cloudinary=require('cloudinary').v2;
const fs=require('fs');
const sendEmail=require('../utills/sendEmail');
const crypto=require('crypto');
const emailverificationTemplate=require('../mail/emailVerificationTemplate');

const cookieOptions={
    maxAge:7*24*60*60*1000, //7 days
    httpOnly:true,
    secure:true
}
// Register handler
exports.register=async(req,res,next)=>{
    try{
        const {fullName,email,password}=req.body;

        //Validation check
        if(!fullName || !email || !password){
            return next(new AppError("All fields are required",400));
        }
        
        const userExists=await User.findOne({email});
        if(userExists){
            return next(new AppError("Email already exits",400));
        }
    
        const user=await User.create({
            fullName,
            password,
            email,
            avatar:{
                public_id:email,
                secure_url:"https:res.cloudinary.com/dzfziveic/image/upload/v1723530030/Codehelp"
            }
        })
        if(!user){
            return next(new AppError("User Registration failed, please try again",400));
        }
        //TODO:File Upload
        console.log("File details->",req.file);
        if(req.file){
           
            try{
                const result=await cloudinary.uploader.upload(req.file.path,{
                    folder:'lms',
                    width:250,
                    height:250,
                    gravity:'faces',
                    crop:'fill',
                });
                if(result){
                    user.avatar.public_id=result.public_id;
                    user.avatar.secure_url=result.secure_url;


                    //Remove file remove from server
                    fs.rm(`uploads/${req.file.filename}`,(err)=>{
                        if (err) {
                            console.error('Error deleting the file:', err);
                            return;
                        }
                          console.log('File deleted successfully');
                    });
                }
            }
            catch(err){
                return next(new AppError(err || 'File not uploaded please try again',500))
            }
        }
        await user.save();
        user.password=undefined;

        try {
           
            await sendEmail(
              user.email,
              `User Registration Successfull`,
              emailverificationTemplate(
                user.fullName
              )
            )
          } catch (error) {
            console.log("error in sending mail", error)
            return res
              .status(400)
              .json({ success: false, message: "Could not send email" })
          }
        //Create JWT 
        const token=await user.generateJWTToken();
        user.token=token;
        res.cookie("token",token,cookieOptions);
        res.status(200).json({
            success:true,
            message:"User registered Successfully",
            user
        })
    }
    catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}


// login handler
exports.login=async(req,res,next)=>{
      try{
        const {email,password}=req.body;

        if(!email || !password){
            return next(new AppError('All fields are required',400));
        }
        const user=await User.findOne({email}).select('+password');
        
        const isValidPassword=await user.comparePassword(password);
        
        if(!user || !isValidPassword){
            return next(new AppError('Email or password does not match',400));
        }

        // console.log({password, hashedPassword: user.password ,isValidPassword});
        
        const token=await user.generateJWTToken();
        user.token=token;
        user.password=undefined;
    
        res.cookie("token",token,cookieOptions);
    
        res.status(200).json({
            success:true,
            message:"User Loggedin Successfully",
            user
        })
      }
      catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}

// logout handler
exports.logout=async(req,res,next)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })
}

// getProfile handler
exports.getProfile=async(req,res,next)=>{
   try{
    const userId=req.user.id;
    const user=await User.findById(userId);

    res.status(200).json({
        success:true,
        message:"User Details",
        user
    })
   }
   catch(err){
      return next(new AppError("Failed to fetch profile",500));
   }
}

//forgotPassword handler
exports.forgotPassword=async(req,res,next)=>{
    try{
        const {email}=req.body;

        if(!email){
            return next(new AppError("Email is required",400));
        }
        const user=await User.findOne({email});
        if(!user){
            return next(new AppError("Email not registered",400));
        }
        const resetToken=await user.generatePasswordResetToken();
        await user.save();

        const resetPasswordURL=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        //message and subject for send mail to user emailId
        const subject="Reset Password"
        const message=`You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">${resetPasswordURL}<a/>\nIf the above link does not work for some reason then copy paste this link in new tab${resetPasswordURL}\nIf you have not requested this,kindly ignore.`
        try{
            await sendEmail(email,subject,message);

            res.status(200).json({
                success:true,
                message:`Reset password token has been sent to ${email}`
            })
        }
        catch(err){
            user.forgotPasswordExpiry=undefined;
            user.forgotPasswordToken=undefined;

            await user.save();
            return next(new AppError(err.message,500));
        }
    }
    catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}

//resetPassword handler
exports.resetPassword=async(req,res,next)=>{
    try{
        const {resetToken}=req.params;
        
        const {password}=req.body;

        const forgotPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
        // console.log(forgotPasswordToken);

        const user=await User.findOne({
            forgotPasswordToken,
            forgotPasswordExpiry:{$gt:Date.now()}
        })

        if(!user){
            return next(new AppError('Token is invalid or expired please try again',400));
        }
        user.password=password;
        
        user.forgotPasswordToken=undefined;
        user.forgotPasswordExpiry=undefined;
        await user.save();

        res.status(200).json({
            success:true,
            message:"Paaword change successfully!"
        })

    }
    catch(err){
       console.log(err);
       return next(new AppError(err.message,500));
    }
}

//change password handler
exports.changePassword=async(req,res,next)=>{
    try{
        let {oldPassword,newPassword}=req.body;
        const {id}=req.user;

        //validation
        if(!oldPassword || !newPassword){
            return next(new AppError('All fields are mandatory',400));
        }
        const user=await User.findById(id).select('+password');

        if(!user){
            return next(new AppError('User does not exits',400));
        }
        const isPasswordValid=await user.comparePassword(oldPassword);
        // console.log({ oldPassword, hashedPassword: user.password, isPasswordValid });

        if(!isPasswordValid){
            return next(new AppError('Invalid old password',400));
        }
        user.password=newPassword;
        await user.save();

        user.password=undefined;
        res.status(200).json({
            success:true,
            message:"Password changed successfully"
        })

    }
    catch(err){
        return next(new AppError(err.message,400));
    }
}

//update User handler
exports.updateUser=async(req,res,next)=>{
    try{
        const {fullName}=req.body;
        const {id}=req.params;
        
        const user=await User.findById(id);

        if(!user){
            return next(new AppError("User not does not exist",400));
        }
        if(fullName){
            user.fullName=fullName;
        }
        if(req.file){
            await cloudinary.uploader.destroy(user.avatar.public_id);

            try{
                const result=await cloudinary.uploader.upload(req.file.path,{
                    folder:'lms',
                    width:250,
                    height:250,
                    gravity:'faces',
                    crop:'fill',
                });
                if(result){
                    user.avatar.public_id=result.public_id;
                    user.avatar.secure_url=result.secure_url;


                    //Remove file remove from server
                    fs.rm(`uploads/${req.file.filename}`,(err)=>{
                        if (err) {
                            console.error('Error deleting the file:', err);
                            return;
                        }
                          console.log('File deleted successfully');
                    });
                }
            }
            catch(err){
                return next(new AppError(err || 'File not uploaded please try again',500))
            }
        }
       await user.save();

       res.status(200).json({
          success:true,
          message:"User details updated successfully"
       })
    }
    catch(err){
        console.log(err);
    }
}

