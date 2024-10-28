const path=require('path');
const multer=require('multer');

const upload=multer({
    
    limits:{fileSize:100*1024*1024},
    storage:multer.diskStorage({
        destination:"uploads/",
        filename:(_req,file,cb)=>{
            cb(null,file.originalname);
        }
    }),
    fileFilter:(_req,file,cb)=>{
        let ext=path.extname(file.originalname);
        if( ext!==".jpg" && ext!==".jpeg" && ext!==".webp" && ext!==".png" && ext!==".mp4" &&ext!=="m4v"){
                cb(new Error(`Unsupported file type! ${ext}`),false);
                return;
        }
        cb(null,true);
    }
})

module.exports=upload;