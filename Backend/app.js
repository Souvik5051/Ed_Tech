const express=require('express');
//app create
const app=express();

// import
const cors=require('cors');
const cookieParser=require('cookie-parser');

require('dotenv').config();

//middleware add karnaha
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true,
}))
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));




//api route mount karnah and routes of 3 models
app.use('/ping',(req,res)=>{
    res.send("Pong");
})

//user related route
const userRoute=require('./routes/userRoutes');
app.use('/api/v1/user',userRoute);

//course related route
const courseRoute=require('./routes/courseRoutes');
app.use('/api/v1/courses',courseRoute);

//payment related route
const paymentRoute=require('./routes/paymentRoute');
app.use('/api/v1/payments',paymentRoute);

const AdminRoute=require('./routes/AdminRoutes');
//Admin realted route
app.use('/api/v1/admin',AdminRoute);


app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 Page Not Found');
})

const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);

module.exports=app;



