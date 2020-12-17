const fs = require('fs');
const jwt= require("jsonwebtoken")
const storage = require('node-sessionstorage')







module.exports ={
    addClient: (req,res)=>{
        
    
   let name= req.body.name;
   let email = req.body.email;
   let phoneNumber= req.body.phoneNumber;
   let username = req.body.username;
   let password= req.body.password;


   let usernameQuery= `SELECT * from client WHERE username='${username}'`
   db.query(usernameQuery,(err,result)=>{
       if(err) res.status(500).send(err);
       if(result.length>0){
           res.send("Client username already  exists");
       }
       else {

        let query= `INSERT INTO client(name,email,phone_number,username,password) VALUES ('${name}','${email}',${phoneNumber},'${username}','${password}')`
        db.query(query,(err,result)=>{
            if(err) res.status(500).send(err);
            res.redirect("/")
        })
       }

   })

},
loginClient:(req,res)=>{
    let email= req.body.email
    let password = req.body.password
    let usernameQuery= `SELECT * from client WHERE email='${email}' AND password='${password}'`
    db.query(usernameQuery,(err,result)=>{
        if(err) res.status(500).send(err);
        if(result.length<=0){
            res.send("Email and or password incorrect");
        }
        else {
            let payload={result:result}
            const token = jwt.sign(payload,'thesecretkeyclient')
            storage.setItem('client_token',token);
            storage.setItem('client',result);
            res.redirect("/")
             
        
        }
 
    })

},
    logoutClient:(req,res)=>{
        token=""
        client=[]
        storage.setItem('client_token',token);
        storage.setItem('client',client);
        res.redirect("/")
    }

}