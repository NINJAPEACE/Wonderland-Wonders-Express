const express = require("express"), app = express();
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ninjabro:wtfman@cluster0.spf3bd5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {});

mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))

const {Schema, model} = mongoose;

const timeSchema = new Schema({
  username: String,
  time: Number
})

// make fruit model
const Data = model("UserData", timeSchema);

app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true}))

//setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

//route for index page
app.get("/hareishere", function (req, res) {
  res.render("index");
});

app.get("/smartabsolem123", function (req, res) {
  res.render("absolem");
});

app.get("/datasee", async(req, res) => {
  const data  = await Data.find({});
  res.render("datasee", {data});
});

app.get("*", function(req, res) {
  res.render("404");
})

app.post("/submit", async(req, res) => {
  console.log(req.body);
  if(req.body.password == "eatme") {
    await Data.create({username: req.body.username, time: Date.now()});
    res.redirect("https://github.com/NINJAPEACE");
  } else if(req.body.password == "drinkme") {
    res.redirect("https://tryitands.ee");
  }
})

app.listen(8080, function () {
  console.log("Server is running on port 8080 ");
});