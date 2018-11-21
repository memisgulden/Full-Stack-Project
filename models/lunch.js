// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
var Lunch = sequelize.define("lunch", {
  group_name: {
    type: Sequelize.STRING
  },
  user_name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  restaurant_name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  address: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  phone: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  rating: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  website: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
}, {
    timestamps: false
  });
// console.log("lunch model", Lunch)

// Syncs with DB
Lunch.sync();

// Makes the Lunch Model available for other files (will also create a table)
module.exports = Lunch;