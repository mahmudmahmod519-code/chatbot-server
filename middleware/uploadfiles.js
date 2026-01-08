const multer=require("multer");

const storage=multer.diskStorage({
    destination:(req,file,cb)=> cb(null,'upload/') ,
    filename:(req,file,cb)=> cb(null,`${Date.now()}-${file.originalname}`)
})


module.exports=multer({
        storage
        ,limits:{fileSize:1024*1024*1024*2}
        ,fileFilter:(req,file,cb)=>{
            if(!file.mimetype.startsWith("image"))return cb(new Error("this file is not valid"))
                cb(null,true);
        }
    }
);
