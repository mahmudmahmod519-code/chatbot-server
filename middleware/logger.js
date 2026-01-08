const fs =require("fs");



module.exports=(req,res,next)=>{
  
  console.log(req.ip);
   
  fs.appendFileSync(
      './log.txt',
      JSON.stringify({
        date: new Date().toISOString(),
        device_ip: req.ip
      }) + '\n'
    );
    next();
}