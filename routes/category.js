module.exports = {
   
    returnCategory: (placeId,callback)=>{
        
        const query= `SELECT * from place natural join category WHERE place_id=${placeId}`
        db.query(query,(err,result)=>{
            if(err) callback(err,null)
            callback(null,result)
        })
       
    }


}