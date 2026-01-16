const getSystemPrompt = require("../utility/promptsSystem");
const query=require("../utility/createQuerey");


async function main_model(promptUser,context,userid,image_url=undefined){

    let model=process.env.model_chat;

    if(context==='coding'||context==='interview')
        model=process.env.model_accuorcy;
    else if(context==='image')
        model=process.env.model_image;

    if(image_url)
        return image_model(model,promptUser,image_url);    
    else
        return text_model(model,promptUser,context,userid);
}




async function text_model(model,promptUser,context,userid){
    try{
    let body=[];
    
    const [messages]=await query(`SELECT * FROM HISTORY WHERE user_id=?`,[userid]);

    const history=JSON.parse(messages.chat);

    
    const systemPrompt = getSystemPrompt(context);
    
    if(history.length>0)
        body.push(...history)
    else{
        body.push({
            'role':"system",
            'content':systemPrompt
        });
    }
 
 
    
        
    body.push({
          "role": "user",
          "content": promptUser
        })
    


    const res=await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        "model": model, 
        "messages": body
    })
});


    const data=await res.json();
    
    if (!data.choices || !data.choices[0]) {
        throw new Error("Invalid API response");
    }
        
    history.push(
    {
        'role':'user',
        'content':promptUser
    },
    {
        'role':'system',
        'content':data.choices[0].message.content,
    });

    if(history.length>=15)
        history.splice(0,parseInt(history.length/2));

    //update history
    await query(
      `UPDATE HISTORY SET chat=? WHERE user_id=?`
    ,[JSON.stringify(history), userid]);
    
    return data.choices[0].message.content;
    
    }catch(ex){
        throw ex;
    }
}


async function image_model(model,promptUser,image_url){
    
    const res=await fetch("https://openrouter.ai/api/v1/chat/completions", {
     method: "POST",
     headers: {
       "Authorization": `Bearer ${process.env.API_KEY}`,
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       "model": model,
       "messages": [
        {
           "role": "user",
           "content": [
             {
               "type": "text",
               "text":promptUser
             },
             {
               "type": "image_url",
               "image_url": {
                //  "url": image_url
                 "url": "https://t4.ftcdn.net/jpg/00/60/92/03/360_F_60920320_Dadb7gTyyDfKGPby86aWb14CLTJiX1Ba.jpg"
               }
             }
           ]
         }
       ]
     })
    });

	const result=await res.json();

    return result.choices[0].message.content
}



module.exports=main_model;