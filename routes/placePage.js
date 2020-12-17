const {showReviews}= require("./review")
const {returnPackages} = require("./package")
const {returnCategory}= require("./category")
const place = require("./place")
const storage = require('node-sessionstorage')
module.exports={
    showPlace:(req,res)=>{
        let client= storage.getItem("client")
        let placeId=req.params.placeId
        let query = `SELECT * from place  WHERE place.place_id= ${placeId} `
        db.query(query,(err,result)=>{
            if(err) res.status(500).send("There was an error rendering the page")
            //Callback review
            showReviews(placeId,(err,data)=>{
                if(err) {console.log(err); return error;}
                else{
                    //console.log(data)
                    returnPackages(placeId,(err,data1)=>{
                        if(err)  {console.log(err); return error;}
                        else {
                            returnCategory(placeId,(err,data2)=>{
                                if(err)  {console.log(err); return error;}
                                else {
                                    res.render("placePage.ejs",{place:result,reviews:data, packages:data1,category:data2})
                                }})
                        }
                    })

                   //res.render("placePage.ejs",{place:result, reviews:data})
                    //return res.send({place:result,reviews:data});
                }
            })
            



            //res.send({place:result,reviews:review})
            /*
            res.render('placePage',{place:result})
            */
        })
    },
    
    returnPlace: (placeId,callback)=>{
        
        const query= `SELECT * from place WHERE place_id=${placeId}`
        db.query(query,(err,result)=>{
            if(err) callback(err,null)
            callback(null,result)
        })
       
    }



}