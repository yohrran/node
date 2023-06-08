const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;
const handlers = require("./lib/handler");
const bodyParser = require("body-parser");
const multiparty = require("multiparty");
const credentials = require("./.credentials.development");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flashMiddleware = require("./lib/middleware/flash");
const nodemailer = require("nodemailer");

const mailTransport = nodemailer.createTransport({
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password,
  },
});
app.use(cookieParser(credentials.cookieSecret));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
  })
);
app.use(flashMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.disable("x-powered-by");

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.get("/greeting", (req, res) => {
  res.render("greeting", {
    message: "Hello esteemed programmer!",
    style: req.query.style,
    userid: req.cookies.userid,
    username: req.session.username,
  });
});

app.get("/no-layout", (req, res) => {
  res.render("no-layout", { layout: null });
});

app.get("/custom/layout", (req, res) => {
  res.render("custom-layout", { layout: "custom" });
});

app.get("/text", (req, res) => {
  res.type("text/plain");
  res.send("this is a test");
});

app.get("/headers", (req, res) => {
  res.type("text/plain");
  const headers = Object.entries(req.headers).map(
    ([key, value]) => `${key}: ${value}`
  );
  res.send(headers.join("\n"));
});

app.get("/newsletter", handlers.newsletter);

const VALID_EMAIL_REGEX = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

app.post("/newsletter", function (req, res) {
  const name = req.body.name || "";
  const email = req.body.email || "";

  if (VALID_EMAIL_REGEX.test(email)) {
    res.session.flash = {
      type: "danger",
      intro: "Validation error!",
      message: "The email address you entered was not valid",
    };

    return res.redirect(303, "/newsletter");
  }

  new handlers.newsletterSignup(
    { name, email }.save((err) => {
      if (err) {
        req.session.flash = {
          type: "danger",
          intro: "Validation error!",
          message: "There was a database error, pleases try again",
        };
        return res.redirect(303, "/newsletter/archive");
      }
      req.session.falsh = {
        type: "success",
        intro: "Thank you!",
        message: "You have now been signed up for the newsletter",
      };
      return res.redirect(303, "/newsletter/archive");
    })
  );
});
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);
app.get("/newsletter-signup", handlers.newsletterSignup);
app.get("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

app.post("/contest/vacation-photo/:year/:month", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    handlers.vacationPhotoContestProcess(req, res, fields, files);
  });
});

app.use(handlers.notFound);

app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port} + press Ctrl + C to terminate`
    );
  });
} else {
  module.exports = app;
}
