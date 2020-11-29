const fs = require('fs');
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
            res.send("Client registered")
        })
       }

   })

}

}