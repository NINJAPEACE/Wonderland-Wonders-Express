const express = require("express"), app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");

mongoose.connect(process.env.MONGODB_URI, {});

mongoose.connection
.on("open", () => console.log("[!] Mongoose Database Connected"))
.on("close", () => console.log("[!] Mongoose Database Closed"))
.on("error", (error) => console.log(error))

const { Schema, model } = mongoose;

const timeSchema = new Schema({
  username: String,
  time: Number
})

const Data = model("UserData", timeSchema);

app.use(morgan("tiny"));
app.use(methodOverride("_method")) ;
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/hareishere", function (req, res) {
  res.render("index");
});

app.get("/absolemganteng123", function (req, res) {
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
  let theURL = req.protocol + '://' + req.get('host');

  if(!req.body) {
    res.redirect(theURL + "/hareishere");
  } else {
    console.log("[SUBMIT] ", req.body);
    if(req.body.password == "eatme") {
      await Data.create({username: req.body.username, time: Date.now()});
      res.redirect("https://github.com/NINJAPEACE");
    } else if(req.body.password == "drinkme") {
      res.redirect("https://tryitands.ee");
    }
  }
})

 app.listen(8080, function () {
    console.log("[!] Wonderland Wonders is currently running on port 8080");
    console.log("[!] Listening to the events...")
   console.log("==================================================")
  });

module.exports = app;