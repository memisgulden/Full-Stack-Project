// Dependencies
var mysql = require("mysql");
var Sequelize = require("sequelize");
var sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  sequelize = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root",
    password: "password",
    database: "lunch_db"
  })
}

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
// var sequelize = new Sequelize("lunch_db", "root", "password", {
//   host: "l6slz5o3eduzatkw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//   user: "",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

// Exports the connection for other files to use
module.exports = sequelize;

connection.connect();
// module.exports = connection;
