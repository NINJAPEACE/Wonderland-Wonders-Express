const express = require("express"),
  app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");

mongoose.connect(process.env.MONGODB_URI, {});

mongoose.connection
  .on("open", () => console.log("[!] Mongoose Database Connected"))
  .on("close", () => console.log("[!] Mongoose Database Closed"))
  .on("error", (error) => console.log(error));

const { Schema, model } = mongoose;

const userScheme = new Schema({
  username: String,
  ticktock: Number,
  items: Array,
});

const Data = model("UserData", userScheme);

app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/hareishere", function (req, res) {
  if (req.query.wrongpass) {
    res.render("ticktock", { wrongpass: true, username: req.query.userid });
  } else res.render("ticktock");
});

app.get("/absolemganteng123", async (req, res) => {
  let list = [
    "hookah",
    "glasses",
    "mushroom",
    "cake",
    "potion",
    "jubjubbird",
    "bandersnatch",
  ];

  let username = req.query.username;
  let item = req.query.item;
  if (username) {
    if (list.includes(item)) {
      const userData = await Data.findOne({ username: username });
      if (userData) {
        if (userData.items.includes(item)) {
          res.render("absolem", { allowed: "false", item: item });
        } else {
          let success = ["hookah", "glasses", "mushroom"];

          if (success.includes(item)) {
            res.render("absolem", { allowed: "success", item: item });
          } else {
            res.render("absolem", { allowed: "zonk", item: item });
          }

          userData.items.push(item);
          await userData.save();
        }
      } else {
        res.render("absolem", { allowed: "null", item: item });
      }
    } else {
      res.render("absolem", { allowed: "prank" });
    }
  } else {
    res.render("absolem", { allowed: null });
  }
});

app.get("/datasee", async (req, res) => {
  const data = await Data.find({});
  res.render("datasee", { data });
});

app.get("*", function (req, res) {
  res.render("404");
});

app.post("/submit", async (req, res) => {
  let theURL =
    "https://0137b1cf-c204-4849-bf00-14452970fc6f-00-3rex8pf0sl8of.sisko.replit.dev:8080";

  if (!req.body) {
    res.redirect(theURL + "/hareishere");
  } else {
    console.log(`[SUBMIT] ${req.body.username} --- ${req.body.password}`);

    const userData = await Data.findOne({ username: req.body.username });

    if (userData) {
      res.redirect(theURL + "/hareishere?alreadyregistered=true");
    } else {
      if (req.body.password.replace(/\s/g, "").toLowerCase() == "eatme") {
        await Data.create({
          username: req.body.username,
          ticktock: Date.now(),
        });
        res.redirect("https://youtu.be/8KSCLZlp7zc?si=OriZKvCrbB9aUhZc");
      } else if (
        req.body.password.replace(/\s/g, "").toLowerCase() == "drinkme"
      ) {
        res.redirect("https://youtu.be/X6-lC2VKD8A?si=rE3Gs88TE1-fATNF");
      } else {
        res.redirect(theURL + "/hareishere?wrongpass=true");
      }
    }
  }
});

app.listen(8080, function () {
  console.log("[!] Wonderland Wonders is currently running on port 8080");
  console.log("[!] Listening to the events...");
  console.log("==================================================");
});

module.exports = app;
