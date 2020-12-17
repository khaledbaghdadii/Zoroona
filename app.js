var mysql = require("mysql");
const { addManager, loginManager } = require("./routes/manager");
const { addClient, loginClient } = require("./routes/client");
const { addPlace, showPlaces } = require("./routes/place");
const { showPlace,returnPlace } = require("./routes/placePage");
const {addReview, showReviews}= require("./routes/review");
const {auth,authLogin} =require("./helpers/auth")
const {addPackage, showPackages}= require("./routes/package")
const {addReservation} = require("./routes/reservation")
const {showDashboard} = require("./routes/dashboard")
const {showDashboardPlace}= require("./routes/dashboardPlace")
const storage = require('node-sessionstorage')

// import passport and passport-jwt modules
const passport = require('./helpers/passport');







const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "zoroona",
});

global.db = db;

const express = require("express");
app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(passport.initialize())
//Home page
app.get("/",(req,res)=>{
  showPlaces(req,res);
})
//Signup as manager
app.post("/signupmanager", (req, res) => {
  addManager(req, res);
});

//Signup as client
app.post("/signupclient", (req, res) => {
  addClient(req, res);
});


//Add review to place
app.post("/addreview",(req,res)=>{
  addReview(req,res);
})

app.get("/loginmanager",(req,res)=>{
  res.render("C:/Users/USP/Desktop/Study Material/Fall 2020/Database Systems/Project/codes/views/login.ejs")
  console.log(storage.getItem("manager"))
})
app.post("/loginmanager", (req, res) => {
  
 loginManager(req, res);
  
});

app.get("/loginclient",(req,res)=>{
 // res.render("C:/Users/USP/Desktop/Study Material/Fall 2020/Database Systems/Project/codes/views/login.ejs")
})
app.post("/loginclient", (req, res) => {
  //const { email, password } = req.body;
 loginClient(req, res);
  
});
//To be removed
app.post("/addpackage",(req,res)=>{
  addPackage(req,res);
})
app.post("/addreservation",(req,res)=>{
  addReservation(req,res);
})

app.route("/packages/:placeId")
.get((req,res)=>{
  showPackages(req,res);
});

//Not removed
app.get("/dashboard",auth,(req,res)=>{
  if(!auth) res.redirect("/")
  else {
    showDashboard(req,res)
  }
  
})

app.get("/dashboard/places/:placeId",auth,(req,res)=>{
  showDashboardPlace(req,res)
})
app.post("/dashboard",auth,(req,res)=>{
  if(!auth) res.redirect("/")
  else {
    addPlace(req,res)
  }
  
})


app.get("/onlyclients",authLogin,(req,res)=>{
  res.json(storage.getItem("client"))
})

//Selected Place API 
app.route("/places/:placeId")
.get((req,res)=>{
  showPlace(req,res);
}).post((req,res)=>{
  addReview(req,res);
})

app.post("/reservation",authLogin,(req,res)=>{
  addReservation(req,res)
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
