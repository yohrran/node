const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;
const handlers = require("./lib/handler");
const bodyParser = require("body-parser");

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

app.get("/newsletter-signup", handlers.newsletterSignup);
app.get("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

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
