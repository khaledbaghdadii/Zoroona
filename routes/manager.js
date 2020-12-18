const fs = require('fs');
const jwt=require('jsonwebtoken')
const axios = require("axios");
const storage = require('node-sessionstorage')
const {showDashboard} = require('./dashboard')
module.exports = {
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
            res.redirect("/")
        })
       }

   })

},
loginManager:(req,res)=>{
    let email= req.body.email
    let password = req.body.password
    let usernameQuery= `SELECT * from manager WHERE email='${email}' AND password='${password}'`
    db.query(usernameQuery,(err,result)=>{
        if(err) res.status(500).send(err);
        if(result.length<=0){
            res.redirect("/loginmanager")
        }
        else {
            const token = jwt.sign({result:result},'thesecretkey')
            storage.setItem('token',token);
            storage.setItem('manager',result);
            res.redirect("/dashboard")
            // axios.get('http://localhost:5000/dashboard', {
            //     headers: {
            //       'Authorization': `Bearer ${token}`
            //     }
            //   })
            //   .then((res) => {
            //     global.dashboarddata (res.data)
            //   })
            //   .catch((error) => {
            //     console.error(error)
            //   }) 
            //   res.send(global.dashboarddata)
            
             
        
        }
 
    })

},
    logoutManager:(req,res)=>{
    token=""
    manager=[]
    storage.setItem('token',token);
    storage.setItem('manager',manager);
    res.redirect("/")
}

}