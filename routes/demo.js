const express = require("express");

const emailValidator = require("deep-email-validator");

const db = require("../data/database");
const bcryptjs = require("bcryptjs");

const { redirect } = require("express/lib/response");

const app = express();
app.use(express.json());
var validator = require("email-validator");

const router = express.Router();

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
  res.render("feedback");
});

router.get("/contact", function (req, res) {
  res.render("contact-us");
});

router.get("/signup", function (req, res) {
  let previousData = req.session.inputData;
  if (!previousData) {
    previousData = {
      hasError: false,
      message: "",
      enteredEmail: "",
      enteredConfirmEmail: "",
      enteredPassword: "",
    };
  }
  // req.session.inputData = null;
  console.log(req.session.inputData);
  res.render("signup", { previousData: previousData });
});

router.post("/signup", async function (req, res) {
  const email = req.body.email;
  const confirmEmail = req.body["confirm-email"];
  const password = req.body.password;
  const hashedPassword = await bcryptjs.hash(password, 12);

  const user = {
    email: email,
    password: hashedPassword,
  };
  if (
    email !== confirmEmail ||
    password.trim() < 6 ||
    !email.includes("@") ||
    !emailValidator.validate(email)
  ) {
    if (!email.includes("itbhu.ac.in")) {
      req.session.inputData = {
        hasError: true,
        message: "Enter your institue ID",
        enteredEmail: email,
        enteredConfirmEmail: confirmEmail,
        enteredPassword: password,
      };
    } else
      req.session.inputData = {
        hasError: true,
        message: "Invalid input",
        enteredEmail: email,
        enteredConfirmEmail: confirmEmail,
        enteredPassword: password,
      };
    req.session.save(function () {
      res.redirect("/signup");
    });

    return;
  }

  await db.getDb().collection("users").insertOne(user);
  res.redirect("/login");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const enteredUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });
  if (!enteredUser) {
    console.log("could not log in!");
    return res.redirect("/login");
  }

  const passwordEqual = await bcryptjs.compare(password, enteredUser.password);

  if (!passwordEqual) {
    console.log("could not log in!");
    return res.redirect("/login");
  }
  // console.log('user authenticated!');

  req.session.user = { id: enteredUser._id, email: enteredUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/");
  });
});

router.get("/admin", function (req, res) {
  res.render("admin");
});

router.post("/logout", function (req, res) {});

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log("Name: " + profile.getName());
//   console.log("Image URL: " + profile.getImageUrl());
//   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

module.exports = router;
