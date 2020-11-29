var mysql = require("mysql");
const { addManager } = require("./routes/manager");
const { addClient } = require("./routes/client");
const { addPlace, showPlaces } = require("./routes/place");
const { showPlace } = require("./routes/placePage");
const {addReview, showReviews}= require("./routes/review");
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

//Add a place to databse
app.post("/addplace", (req, res) => {
  addPlace(req, res);
});

//Add review to place
app.post("/addreview",(req,res)=>{
  addReview(req,res);
})

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const result = loginManager(username, password);
  console.log(result);
  res.send(result);
});



//Selected Place API 
app.route("/places/:placeId")
.get((req,res)=>{
  showPlace(req,res);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
