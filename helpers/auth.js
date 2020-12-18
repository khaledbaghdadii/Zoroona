const jwt = require("jsonwebtoken")
const storage = require('node-sessionstorage')

module.exports={
    auth:  (req,res,next)=>{
       
        jwt.verify(storage.getItem('token'),"thesecretkey",(err,user)=>{
            if(err) return res.redirect("loginmanager")
            req.user=user;
            next()
        })
        
        
    },
    authLogin: (req,res,next)=>{
        jwt.verify(storage.getItem('client_token'),"thesecretkeyclient",(err,user)=>{
            if(err) return res.redirect("/loginclient")
            req.user=user;
            next()
        })
        
    }
}
