const path = require("path");

const express = require("express");

const db = require("./data/database");
const demoRoutes = require("./routes/demo");

const app = express();
const expressSession = require("express-session");
const createSessionConfig = require("./config/sessions");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(demoRoutes);
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {

  app.listen(3000);
});

// const signinDiv = document.getElementById("signinDiv");
// console.log(signinDiv);
