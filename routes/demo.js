const express = require("express");

const emailValidator = require("deep-email-validator");

const db = require("../data/database");
const bcryptjs = require("bcryptjs");

const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
const session = require("express-session");

const createSessionConfig = require("../config/sessions");

const sessionConfig = createSessionConfig();
app.use(session(sessionConfig));

const router = express.Router();
const CLIENT_ID =
  "1006096379075-2o56con4lhsrpbviut9ok2722q0sjiue.apps.googleusercontent.com";

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/attendance", function (req, res) {
  res.render("attendance");
});

router.get("/hostel/:id", function (req, res) {
  const id = req.params.id;
  res.render("hostel", { id: id });
});

router.get("/feedback", function (req, res) {
  console.log(req.session);
  res.render("feedback", { data: req.session.user });
  // res.send("hello");
});

router.get("/contact", function (req, res) {
  // console.log(req.session);
  res.render("contact-us");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", async function (req, res) {
  const token = req.body.token;

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  }
  const ticket = await verify();
  // console.log(ticket);
  res.cookie("session-cookie", token);
  res.send("success");
  const user = { email: ticket.email, name: ticket.name };
  req.session.user = user;
  req.session.save();
  console.log(req.session.user);
});

router.get("/admin", function (req, res) {
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
