module.exports = {
    addPackage: (req,res)=>{
        let price = req.body.price;
        let place_id= req.body.placeId;
        let name= req.body.name;
        let description= req.body.description;

        let query = `INSERT INTO package(price,place_id,name,description) VALUES(${price},${place_id},'${name}','${description}')`
        db.query(query,(err,result)=>{
            if(err) res.status(500).send(err);
            res.redirect("/dashboard")
        })
    },
    showPackages: (req,res)=>{
        let place_id= req.params.placeId;
        const query= `SELECT * from package WHERE place_id=${place_id}`
        db.query(query,(err,result)=>{
            if(err) res.status(500).send(err)
            res.send(result)
        })
    },
    returnPackages: (placeId,callback)=>{
        
        const query= `SELECT * from package WHERE place_id=${placeId}`
        db.query(query,(err,result)=>{
            if(err) callback(err,null)
            callback(null,result)
        })
       
    },
    deletePackage:(req,res)=>{
        package_id= req.body.packageId
        let query = `DELETE FROM package WHERE place_id=${place_id}`
        db.query(query,(err,result)=>{
            if(err) res.status(500).send(err);
            res.redirect("/dashboard")
        })
    },


}