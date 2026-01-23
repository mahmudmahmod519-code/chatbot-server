const jwt=require("jsonwebtoken");
const db=require("../database/modelDatabase");
const query=require("../utility/createQuerey");

module.exports=async(req,res,next)=>{
    const token=req.header("Authorization")?.split(" ")[1]||req.cookies?.token ;

    if(!token)return res.status(401).send('not authorized')

    try{

        const decode=jwt.verify(token,process.env.Private_KEY);
        
        if(!decode?.id)return res.status(403).send('forbiddin');

        const [user]=await query('SELECT * FROM USER WHERE id=?',[decode.id]);
        req.user=user;
        
        if (!req.user) return res.status(404).send("User not found");

        next();

    }catch(ex){

    return res.status(401).send("Invalid or expired token");

    }
}