const router=require('express').Router()
const jwt=require("jsonwebtoken");
const db = require('../database/modelDatabase');

router.post("/create-account",async(req,res)=>{
    const {username}=req.body;
    

    const users=db.prepare(`SELECT * FROM USER WHERE username='${username}'`).all();

    if(users.length>0)return res.status(400).json({message:"sorry can't create your account"});

    db.exec(`INSERT INTO USER(username) VALUES ('${username}')`);

    const user=db.prepare(`SELECT * FROM USER WHERE username='${username}'`).get()
    
    const token=jwt.sign({id:user.id},process.env.Private_KEY);

    if(!process.env.FRONTEND.startsWith('app')){ 
        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        
        return res.status(201).json({message:'done add user',user})
    }

    return res.status(201).json({message:'done add user',user,token})
    
});

//temp
router.delete('/',async(req,res)=>{

    db.prepare(`DELETE FROM USER;'`).run();

    return res.status(201).json({message:'done add user'})
    
});


//temp
router.post('/login',async(req,res)=>{
     const {username}=req.body;
    
    const users=db.prepare(`SELECT * FROM USER WHERE username=?`).all(username);

    if(users.length===0)return res.status(400).json({message:"sorry can't create your account"});

    const user=db.prepare(`SELECT * FROM USER WHERE username=?`).get(username);
    
    const token=jwt.sign({id:user.id},process.env.Private_KEY);

    if(!process.env.FRONTEND.startsWith('app')){ 
        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        
        return res.status(201).json({message:'done add user',user})
    }

    return res.status(201).json({message:'done add user',user,token})
    
});


module.exports=router;
