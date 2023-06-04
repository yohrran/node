const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(__dirname + "/public"));

const fortune = [
  "Conquer your fears or they will conquer you",
  "everone hello",
  "i am boy",
];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  const randomFortune = fortune[Math.floor(Math.random() * fortune.length)];

  res.render("about", { fortune: randomFortune });
});

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.use((err, req, res, next) => {
  res.status(500);
  res.render("500");
});

app.listen(port, () => {
  console.log(
    `Express started on http://localhost:${port} + press Ctrl + C to terminate`
  );
});
