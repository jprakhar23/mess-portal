const path = require("path");

const express = require("express");
// const cookieparser = require("cookie-parser");

const db = require("./data/database");

const demoRoutes = require("./routes/demo");

const app = express();
app.use(express.json());
const session = require("express-session");

// const MongoDBStore = mongoDBStore(session);
const createSessionConfig = require("./config/sessions");
// const sessionStore = new MongoDBStore({
//   uri: "mongodb://127.0.0.1:27017",
//   databaseName: "messPortal",
//   collection: "sessions",
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(session(sessionConfig));
app.use(demoRoutes);

// app.use(function (error, req, res, next) {
//   res.render("500");
// });

db.connectToDatabase().then(function () {
  app.listen(3000);
});

// const signinDiv = document.getElementById("signinDiv");
// console.log(signinDiv);
