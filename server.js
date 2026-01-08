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

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(logger,rateLimit);

app.use('/chat',chat)
app.use('/user',user)

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
