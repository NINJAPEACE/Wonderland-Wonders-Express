const express = require("express"),
  app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

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
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/hareishere", function (req, res) {
  if (req.query.wrongpass) {
    res.render("ticktock", { wrongpass: true, username: req.query.userid });
  } else res.render("ticktock");
});

app.get("/absolemganteng123", async (req, res) => {
  let { list } = require("./config.json");

  let username = req.query.username;
  let item = req.query.item;
  if (username) {
    if (list.includes(item)) {
      const userData = await Data.findOne({
        username:
          typeof username == "string"
            ? username.replace(/\s/g, "").toLowerCase()
            : username[username.length - 1].replace(/\s/g, "").toLowerCase(),
      });
      let success = require("./config.json").successList;

      if (userData) {
        if (userData.items.includes(item)) {
          res.render("absolem", { allowed: "false", item: item });
        } else {
          if (success.includes(item)) {
            res.render("absolem", { allowed: "success", item: item });
          } else {
            res.render("absolem", { allowed: "zonk", item: item });
          }

          userData.items.push(item);
          await userData.save();
        }
      } else {
        res.render("absolem", { allowed: "notfound" });
      }
    } else {
      res.render("absolem", { allowed: "prank" });
    }
  } else {
    res.render("absolem", { allowed: null });
  }
});

app.get("/datasee", async (req, res) => {
  let data = await Data.find({});

  for (let x = 0; x < data.length; x++) {
    let score = 0;

    for (y of data[x].items) {
      if (require("./config.json").successList.includes(y)) score += 1;
      else score -= 1;
    }

    data[x].score = score;
  }

  data = data.sort((a, b) => {
    let z = b.score - a.score;

    if (z == 0) {
      return a.ticktock - b.ticktock;
    } else return z;
  });
  res.render("datasee", { data });
});

let { successList } = require("./config.json");

app.get("/playlistabsolemganteng", async (req, res) => {
  let username = req.query.user;

  if (username) {
    const userData = await Data.findOne({
      username:
        typeof username == "string"
          ? username.replace(/\s/g, "").toLowerCase()
          : username[username.length - 1].replace(/\s/g, "").toLowerCase(),
    });

    if (
      (userData && userData.items.includes(successList[0])) ||
      (userData && userData.items.includes(successList[1])) ||
      (userData && userData.items.includes(successList[2]))
    ) {
      res.redirect(require("./config.json").playlist);
    } else {
      res.render("404");
    }
  } else {
    res.render("404");
  }
});

app.get("*", function (req, res) {
  res.render("404");
});

app.post("/submit", async (req, res) => {
  let { link } = require("./config.json");

  if (!req.body) {
    res.redirect(link + "/hareishere");
  } else {
    let username = req.body.username;
    username = username.replace(/\s/g, "").toLowerCase();

    console.log(`[SUBMIT] ${username} --- ${req.body.password}`);

    const userData = await Data.findOne({
      username: req.body.username.replace(/\s/g, "").toLowerCase(),
    });

    if (userData) {
      res.redirect(link + "/hareishere?alreadyregistered=true");
    } else {
      if (req.body.password.replace(/\s/g, "").toLowerCase() == "eatme") {
        await Data.create({
          username: username,
          ticktock: Date.now(),
        });
        res.redirect(require("./config.json").successLink);
      } else if (
        req.body.password.replace(/\s/g, "").toLowerCase() == "drinkme"
      ) {
        res.redirect(require("./config.json").failedLink);
      } else {
        res.redirect(link + "/hareishere?wrongpass=true");
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
