const fs = require('fs');
module.exports ={
    addManager: (req,res)=>{
        
    
   let name= req.body.name;
   let email = req.body.email;
   let phoneNumber= req.body.phoneNumber;
   let sector = req.body.sector;
   let username = req.body.username;
   let password= req.body.password;


   let usernameQuery= `SELECT * from manager WHERE username='${username}'`
   db.query(usernameQuery,(err,result)=>{
       if(err) res.status(500).send(err);
       if(result.length>0){
           res.send("Username already  exists");
       }
       else {

        let query= `INSERT INTO manager(name,email,phone_number,sector,username,password) VALUES ('${name}','${email}',${phoneNumber},'${sector}','${username}','${password}')`
        db.query(query,(err,result)=>{
            if(err) res.status(500).send(err);
            res.send("Manager registered")
        })
       }

   })

}

}