const router=require('express').Router()
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {signIn,signUp}=require('../utility/validation');
const query=require("../utility/createQuerey");

router.post("/create-account",async(req,res)=>{
    const {email,password,username,phone}=req.body;
    

    const {error}=signUp(req.body);
    if(error)return res.status(400).json({message:error.details[0].message});

    const users=await query(`SELECT * FROM USER WHERE username=? OR email=?`,[username,email]);

    if(users.length>0)return res.status(409).json({message:"Username or email already exists"});
    

    const salt=await bcrypt.genSalt(10,'a');

    const hashPassword=await bcrypt.hash(password,salt);

    //create hashed password
    await query(`INSERT INTO USER(username,email,password,phone) VALUES (?,?,?,?)`,
        [username,email,hashPassword,phone]);
    
    const [user]=await query(`SELECT * FROM USER WHERE username=?`,[username]);
       
    const token=jwt.sign({id:user.id},process.env.Private_KEY);
        
        if(!process.env.FRONTEND.startsWith('app')){ 
            res.cookie("token",token,{
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
    
            return res.status(302).redirect('/chat')
        }
    
        return res.status(201).json({message:'done add user',user,token})
});
    

router.post('/login',async(req,res)=>{
    const {username,password}=req.body;

     
    const {error}=signIn(req.body);
    if(error)return res.status(400).json({message:error.details[0].message});
    
    
    const users=await query(`SELECT * FROM USER WHERE username=? OR email=?`,[username,username]);

    if(users.length===0)return res.status(400).json({message:"sorry can't create your account"});
    

    const match=await bcrypt.compare(password,users[0].password);
    
    if(!match)return res.status(400).json({message:'please enter good password'});


    const token=jwt.sign({id:users[0].id},process.env.Private_KEY);

    if(!process.env.FRONTEND.startsWith('app')){ 
        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
        
        return res.status(302).redirect('/chat')
    }

    return res.status(201).json({message:'done add user',user:users[0],token})
});
   


module.exports=router;
