const {showReviews}= require("./review")
const {returnReservations}= require("./reservation")
const {returnPlace}= require("./placePage")
const {returnPackages}= require("./package")
const storage = require("node-sessionstorage");

module.exports= {
    showDashboardPlace: (req,res)=>{
        placeId= req.params.placeId;
        showReviews(placeId,(err,reviews)=>{
            if(err)  {console.log(err); return error;}
            else {
               returnReservations(placeId,(err,reservations)=>{
                   if(err) {console.log(err);return error;}
                   else {
                       returnPlace(placeId,(err,place)=>{
                        if(err) {console.log(err);return error;}
                        else {
                            returnPackages(placeId,(err,package)=>{
                                if(err) {console.log(err);return error;}
                                else {
                                    
                                  res.render("placeAfterDash.ejs",{reviews:reviews, reservations:reservations,place:place,packages:package})
                                   //res.json({reviews:reviews, reservations:reservations,place:place,packages:package})
                                }
                               })
                           
                        }
                       })
                   }
               })
            }
        })
    },
    editPlacePage: (req,res)=>{
        const placeId = req.params.placeId;
        const manager = storage.getItem("manager")[0]
        returnPlace(placeId,(err,result)=>{
            if(err)  {console.log(err); return err;}
            else {
                res.render("editPlacePage.ejs",{place:result[0],manager:manager})
               // res.json({place:result})
            }
           
           
        })

    },



}