const storage = require('node-sessionstorage')
const {returnManagerPlaces} = require("./place")
module.exports={

   
    showDashboard: (req,res)=>{
        const manager = storage.getItem("manager")[0];
        returnManagerPlaces(manager.id,(err,data)=>{
            if(err)  {console.log(err); return error;}
            else {
               res.render("dashboard.ejs",{manager:manager, places:data})
              
            }
        })
        
        

    },
    showDashboardPlace: (req,res)=>{
        
    }
}