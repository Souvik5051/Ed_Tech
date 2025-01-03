const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        minLength:[8,'Title must be atleast 8 characters'],
        maxLength:[59,'Title should be less then 60 characters'],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Description is required"],
        minLength:[8,'Description must be atleast 8 characters'],
        maxLength:[400,'Description should be less then 200 characters'],
    },
    category:{
        type:String,
        required:[true,"Category is required"],
    },
    thumbnail:{
        public_id:{
            type:String,
            required:true
         },
         secure_url:{
            type:String,
            required:true
        }
    },
    lectures:[
        {
           title:String,
           description:String,
           lecture:{
             public_id:{
                type:String,
             },
             secure_url:{
                type:String
             }
           }
        }
    ],
    numbersOfLecture:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        required:true
    }

}, {
    timestamps:true,
})

module.exports=mongoose.model("Course",courseSchema);