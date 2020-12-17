var mysql = require("mysql");
const { addManager, loginManager, logoutManager } = require("./routes/manager");
const { addClient, loginClient, logoutClient } = require("./routes/client");
const {
  addPlace,
  showPlaces,
  searchPlaces,
  returnSearchesPlaces,
  deletePlace,
  editPlace
} = require("./routes/place");
const { showPlace, returnPlace } = require("./routes/placePage");
const { addReview, showReviews } = require("./routes/review");
const { auth, authLogin } = require("./helpers/auth");
const { addPackage, showPackages, deletePackage } = require("./routes/package");
const { addReservation } = require("./routes/reservation");
const { showDashboard, } = require("./routes/dashboard");
const { showDashboardPlace,editPlacePage } = require("./routes/dashboardPlace");
const { pageNotFound } = require("./routes/pageNotFound");
const storage = require("node-sessionstorage");

// import passport and passport-jwt modules
const passport = require("./helpers/passport");

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
app.use(express.json());
app.use(passport.initialize());


app.post("/addplace",(req,res)=>{
  addPlace(req,res)
})




//Home page
app.get("/", (req, res) => {
  showPlaces(req, res);
});
//Signup as manager
app.post("/signupmanager", (req, res) => {
  addManager(req, res);
});
app.get("/signupmanager", (req, res) => {
  res.render("signupManager.ejs")
});

//Signup as client
app.post("/signupclient", (req, res) => {
  addClient(req, res);
});
app.get("/signupclient", (req, res) => {
  res.render("signUpClient.ejs")
});

//Add review to place
app.post("/addreview", (req, res) => {
  addReview(req, res);
});

//Manager

app.get("/loginmanager", (req, res) => {
  res.render(
    "loginManager.ejs"
  );
  console.log(storage.getItem("manager"));
});
app.post("/loginmanager", (req, res) => {
  loginManager(req, res);
});
//Logout Manager
app.post("/logoutmanager", (req, res) => {
  logoutManager(req, res);
});
// Place
//Delete Place
app.delete("/placedelete", auth, (req, res) => {
  deletePlace(req, res);
});
app.post("/placeedit",auth,(req,res)=>{
editPlace(req,res)
})
//Add place
app.post("/place", auth, (req, res) => {
  if (!auth) res.redirect("/");
  else {
    addPlace(req, res);
  }
});
//Package
//Delete Package
app.delete("/packagedelete", auth, (req, res) => {
  deletePackage(req, res);
});
//Add Package
app.post("/package", auth, (req, res) => {
  if (!auth) res.redirect("/");
  addPackage(req, res);
});

//Client
app.get("/loginclient", (req, res) => {
  res.render(
    "loginClient.ejs"
  );
});
app.post("/loginclient", (req, res) => {
  //const { email, password } = req.body;
  loginClient(req, res);
});
app.post("/logoutclient", (req, res) => {
  logoutClient(req, res);
});

//To be removed



app.route("/packages/:placeId").get((req, res) => {
  showPackages(req, res);
});

//Not removed
app.get("/dashboard", auth, (req, res) => {
  if (!auth) res.redirect("/");
  else {
    showDashboard(req, res);
  }
});

app.get("/dashboard/places/:placeId", auth, (req, res) => {
  showDashboardPlace(req, res);
});

app.get("/dashboard/places/:placeId/edit", auth, (req, res) => {
  editPlacePage(req,res)
});


// app.put("/dashboard/places/:placeId/edit", auth, (req, res) => {
// editPlace(req, res);
// });

app.get("/onlyclients", authLogin, (req, res) => {
  res.json(storage.getItem("client"));
});

//Selected Place API
app
  .route("/places/:placeId")
  .get((req, res) => {
    showPlace(req, res);
  })
  .post((req, res) => {
    addReview(req, res);
  });
//Reservation
app.post("/reservation", authLogin, (req, res) => {
  addReservation(req, res);
});
//Search
app.post("/search", (req, res) => {
  searchPlaces(req, res);
});
app.get("/search/:condition", (req, res) => {
  returnSearchesPlaces(req, res);
});

app.get("*", (req, res) => {
  pageNotFound(req, res);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
