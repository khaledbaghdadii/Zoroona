module.exports = {
    addReservation: (req,res)=>{
       
        let num_of_people= req.body.numOfPeople;
        let start_date= req.body.startDate;
        let end_date= req.body.endDate;
        let client_id=req.body.clientId
        let place_id = req.body.placeId;
        let package_id = req.body.packageId;


        let query = `INSERT INTO reservation(num_of_people,start_date,end_date,client_id,place_id,package_id) VALUES(${num_of_people},'${start_date}','${end_date}',${client_id},${place_id},${package_id})`
        db.query(query,(err,result)=>{
            if(err) res.status(500).send(err);
            res.send("You successfully reserved to this place")
        })
    },

    returnReservations: (placeId,callback)=>{
        
        const query= `SELECT R.*, C.name, C.email, C.phone_number from reservation R NATURAL JOIN client C WHERE place_id=${placeId}`
        db.query(query,(err,result)=>{
            if(err) callback(err,null)
            callback(null,result)
        })
       
    }

}