const {showReviews}= require("./review")
module.exports={
    showPlace:(req,res)=>{
        let placeId=req.params.placeId
        let query = `SELECT * from place  WHERE place.place_id= ${placeId} `
        db.query(query,(err,result)=>{
            if(err) res.status(500).send("There was an error rendering the page")
            //Callback review
            showReviews(placeId,(err,data)=>{
                if(err) {console.log(err); return error;}
                else{
                    console.log(data)
                    return res.send({place:result,reviews:data});
                }
            })
            



            //res.send({place:result,reviews:review})
            /*
            res.render('placePage',{place:result})
            */
        })
    }
}