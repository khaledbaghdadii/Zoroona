const fs = require('fs');
const { callbackify } = require('util');
module.exports ={
    addReview: (req,res)=>{
        
    let placeId = req.body.placeId;
    let name= req.body.name;
    let email =req.body.email;
    let rating = req.body.rating;
    let feedback = req.body.feedback;
    let date = req.body.date;



   let usernameQuery= `SELECT * from review WHERE place_id=${placeId} AND email='${email}' AND date='${date}'`
   db.query(usernameQuery,(err,result)=>{
       if(err) res.status(500).send(err);
       if(result.length>0){
           res.send("You already reviewed for this visit");
       }
       else {

        let query= `INSERT INTO review(place_id,name,email,rating,feedback,date)  VALUES (${placeId},'${name}','${email}',${rating},'${feedback}','${date}')`
        db.query(query,(err,result)=>{
            if(err) res.status(500).send(err);
            res.redirect("/")
        })
       }

   })

},
    showReviews: (placeId,callback)=>{
        
        let query = `SELECT  * from review WHERE place_id=${placeId} ORDER by date`
        db.query(query,(err,result)=>{
            if(err)  callback(err,null);
            callback(null,result)
            /*
            res.render('place.ejs',{reviews:result})
            */
        })
       
    }

}