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
app.get('/',(req,res)=>{
    return res.status(200).sendFile(__dirname+'/public/sign-up.html');
});

app.get('/login',(req,res)=>{
    return res.status(200).sendFile(__dirname+'/public/sign-in.html');
});

app.get('/chat',(req,res)=>{
    return res.status(200).sendFile(__dirname+'/public/chat_model.html');
});



app.use('/api/chat',chat)
app.use('/api/user',user)
app.get('/logging',(req,res)=>{
    res.download('./upload')
})


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
    

    return res.status(500).json({
        message:"Server Internal Error",
        error:err,
        stack:err.stack
    })
});





app.listen(port,()=>{
    console.log("run");
})
