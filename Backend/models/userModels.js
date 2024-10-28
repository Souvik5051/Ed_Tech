const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"Name is required"],
        minLength:[5,'Name must be at least 5 character'],
        maxLength:[50,"Name should be less than 50 character"],
        lowercase:true,
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        trim:true,
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
        ]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,'Password must be at least 8 character'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,

        },
        secure_url:{
            type:String
        }
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    token: {
        type: String,
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    subscription:{
        id:String,
        status:String,
    }
},{
    timestamps:true
})

//Encrypt the password
userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        return next();
    }
    try {
        // const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

//create generic method
userSchema.methods={
    generateJWTToken:async function(){
        return await jwt.sign(
            {id:this._id,email:this.email,role:this.role,subscription:this.subscription},
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY
            }
        )
    },
    comparePassword:async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password);
    },
    generatePasswordResetToken:async function(){
        const resetToken=crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
        this.forgotPasswordExpiry=Date.now() + 15*60*1000 //15 minutes from now

        return resetToken;
    }
}

module.exports=mongoose.model("User",userSchema);