const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;
const handlers = require("./lib/handler");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

app.get("/about", handlers.about);

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
