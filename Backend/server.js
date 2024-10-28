
const app=require('./app');

const PORT=process.env.PORT || 4000;

//db se connect karnah
const dbConnect=require('./config/database');
dbConnect();

//cloudinary se connect karnah
const {clodinaryConnect}=require('./config/cloudinary');
clodinaryConnect();



app.listen(PORT,()=>{
    console.log(`App is running at https:localhost:${PORT}`);   
})