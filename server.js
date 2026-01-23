const express=require("express");
const cors=require("cors");
require("dotenv").config();
const chat=require("./router/chat");
const user=require("./router/user");
const logger=require("./middleware/logger");
const rateLimit=require('./middleware/rateLimit');
const cookieParser = require("cookie-parser");

const port=process.env.PORT||3000;

const app=express();

//with web and app
app.use(cors({
    credentials:!process.env.FRONTEND.startsWith('app'),
    origin:process.env.FRONTEND,
}));


app.use(express.static('./public'))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(logger,rateLimit);

//view
require('./utility/view')(app);


app.use('/api/chat',chat)
app.use('/api/user',user)

const fs=require('fs');
app.delete("/",(req,res)=>{
    
    fs.rm(__dirname+'/database/chat.sqlite');
    try{
        fs.readFile(__dirname+'/database/chat.sqlite');
    }catch(ex){
        console.log(ex)
        res.status(200).send("delete file")
    }
})




app.use((err,req,res,next)=>{
    console.log(err); 
    return res.status(302).redirect('/error')
});





app.listen(port,()=>{
    console.log("run");
})
