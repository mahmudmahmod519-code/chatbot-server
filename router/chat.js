const router=require('express').Router()
const db = require('../database/modelDatabase');
const auth = require('../middleware/auth');
const { validationMessage } = require('../utility/validation');
const main_model = require('../models/model_ai');
const upload=require('../middleware/uploadfiles');



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

    const user=db.prepare(`SELECT * FROM USER WHERE id=?`).get(req.user.id);

    if(!user)return res.status(404).json({message:"sorry not found account"});

    const history=db.prepare(`SELECT id FROM HISTORY WHERE user_id=?`).get(req.user.id);

    if(!history)
        db.exec(`INSERT INTO HISTORY(user_id,chat,type_context)VALUES (${req.user.id},'[]','${context}')`);
    
    const output=await main_model(prompt,context,req.user.id,image_url);
    
    return res.status(200).send(output);
    
    }catch(ex){
        console.log(ex);
        res.status(500).json({
            message:"Server Internal Error",
        });
    }

});


module.exports=router;
