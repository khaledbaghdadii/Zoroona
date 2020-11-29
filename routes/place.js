const fs = require('fs');
//const {showReviews} = require("./review")

module.exports ={
    addPlace: (req,res)=>{
        
    
   let name= req.body.name;
   let email = req.body.email;
   let location = req.body.location;
   let phoneNumber= req.body.phoneNumber;
   let sector = req.body.sector;
   let website = req.body.website;
   let pricePerPerson = req.body.pricePerPerson;
   let managerId= req.body.managerId;
   let categoryId= req.body.categoryId;
   let image = req.body.image;


   let usernameQuery= `SELECT * from place WHERE name='${name}' && phone_number=${phoneNumber}`
   db.query(usernameQuery,(err,result)=>{
       if(err) res.status(500).send(err);
       if(result.length>0){
           res.send("Place already  exists");
       }
       else {

        let query= `INSERT INTO place(name,email,location,phone_number,website,price_per_person,sector,manager_id,category_id,image) VALUES ('${name}','${email}','${location}',${phoneNumber},'${website}',${pricePerPerson},'${sector}',${managerId},${categoryId},'${image}')`
        db.query(query,(err,result)=>{
            if(err) res.status(500).send(err);
            res.send("Place added successfully")
        })
       }

   })

},
    showPlaces: (req,res)=>{
        let query = "SELECT  * from place"
        db.query(query,(err,result)=>{
            if(err) res.status(500).send("There was an error rendering the page")
            res.send({result})
            /*
            res.render('homepage.ejs',{places:result,reviews:showReviews})
            */
        })
    }

}