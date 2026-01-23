const router=require('express').Router()
const auth = require('../middleware/auth');
const { validationMessage } = require('../utility/validation');
const main_model = require('../models/model_ai');
const upload=require('../middleware/uploadfiles');
const query=require("../utility/createQuerey");



router.post('/',auth,upload.single("image"),async(req,res)=>{
    try{

    let { prompt, context = 'conversation' } = req.body;    
    
    let image_url;

    if(req.file){
        context='image';
        image_url=`${req.protocol}://${req.host}/${req.file.path}`
    }
    
    const {error}=validationMessage(req.body);
    if(error)return res.status(400).json({message:error.details[0].message});

    const users=await query(`SELECT * FROM USER WHERE id=?`,[req.user.id]);
    
    if(users.length===0||!users)return res.status(404).json({message:"sorry not found account"});


    const history=await query(`SELECT id FROM HISTORY WHERE user_id=?`,[req.user.id])
    
    if(history.length===0||!history)
        await query(`INSERT INTO HISTORY(user_id,chat,type_context)VALUES (?,'[]',?)`,[req.user.id,context]);

    const output=await main_model(prompt,context,req.user.id,image_url);
    

    return res.status(200).send(output);
    
    }catch(ex){
        console.log(ex);
        res.status(302).redirect('/error');
    }

});


module.exports=router;
