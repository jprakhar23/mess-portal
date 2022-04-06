const express = require("express");

const db = require("../data/database");

const app = express();

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
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {});

router.post("/login", async function (req, res) {});

router.get("/admin", function (req, res) {
  res.render("admin");
});

router.post("/storeauthcode", function (req, res) {
  console.log(req);
  res.redirect("/");
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
