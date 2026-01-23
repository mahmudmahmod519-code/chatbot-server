
module.exports=(app)=>{
    app.get('/',(req,res)=>{
        return res.status(200).sendFile(__dirname+'/public/sign-up.html');
    });
    
    app.get('/login',(req,res)=>{
        return res.status(200).sendFile(__dirname+'/public/sign-in.html');
    });
    
    app.get('/chat',(req,res)=>{
        return res.status(200).sendFile(__dirname+'/public/chat_model.html');
    });
    app.get('/error',(req,res)=>{
        return res.status(200).sendFile(__dirname+'/public/error.html')
    });
}