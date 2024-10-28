const mongoose=require('mongoose');

require('dotenv').config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("DB Connection Successfully");
    })
    .catch((err)=>{
        console.log(err);
        console.log("DB Connection Failed");
        process.exit(1);
    })
}
module.exports=dbConnect;