// *** Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
require("./routing/html-routes.js")(app);
require("./routing/api-routes.js")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});