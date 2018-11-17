// Dependencies 
var db = require("../models/lunch.js");
var Lunch = require("../models/lunch.js")
var sequelize = require("../config/connection.js");

function getRestaurants() {
    $.get("/api/authors", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
    });
}