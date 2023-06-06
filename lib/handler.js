/* eslint-disable no-unused-vars */
const fortune = require("./fortune");

exports.home = (req, res) => res.render("home");

exports.about = (req, res) =>
  res.render("about", { fortune: fortune.getFortune() });

exports.notFound = (req, res) => res.render("404");

exports.serverError = (err, req, res, next) => res.render("500");

exports.newsletterSignup = (req, res) => {
  res.render("newsletter-signup", { csrf: "CSRF token goes here" });
};

exports.newsletterSignupProcess = (req, res) => {
  console.log(`Form (from queryString):: ${req.query.form}`);
  console.log(`CSRF token::: ${req.body._csrf}`);
  console.log(`Name:: ${req.body.name}`);
  console.log(`Email::: ${req.body.email}`);
  res.redirect(303, "/newletter-signup/thnak-you");
};

exports.newsletterSignupThankYou = (req, res) => {
  res.render("newletter-signup-thank-you");
};

exports.newsletter = (req, res) => {
  res.render("newsletter", { csrf: "CSRF token goes here" });
};

exports.api = {
  newsletterSignup: (req, res) => {
    console.log(`CSRF token::: ${req.body._csrf}`);
    console.log(`Name:: ${req.body.name}`);
    console.log(`Email::: ${req.body.email}`);
    res.send({ result: "success" });
  },
};

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log(`fields:: ${fields}`);
  console.log(`file:: ${files}`);
  res.redirect(404, "/contest/vacation-photo-thank-you");
};
