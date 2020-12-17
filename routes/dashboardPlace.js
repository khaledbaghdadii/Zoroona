const {showReviews}= require("./review")
const {returnReservations}= require("./reservation")
const {returnPlace}= require("./placePage")

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
                            res.json({reviews:reviews, reservations:reservations,place:place})
                        }
                       })
                   }
               })
            }
        })
    }
}