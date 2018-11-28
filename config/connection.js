// Dependencies
var Sequelize = require("sequelize");
var mysql = require("mysql");
// var connection;

if (process.env.JAWSDB_URL) {
  var sequelize = new Sequelize( 
    process.env.JAWSDB_URL
   )} else {
  sequelize = new Sequelize("lunch_db", "root", "password", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });


}

<<<<<<< HEAD
// Creates mysql connection
if(process.env.JAWSDB_URL){
   connection = mysql.createConnection(process.env.JAWSDB_URL);
 // the application is executed on Heroku ... use the mysql database
 sequelize = new Sequelize(process.env.HEROKU_JAWSDB_URL, {
   dialect:  'mysql',
   protocol: 'mysql',
   port:     3306,
   host:     "h2cwrn74535xdazj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
   logging:  true
 })
} else {
=======
// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
>>>>>>> dadd0919648f715180745617a2f67df9d0081878

 sequelize = new Sequelize("lunch_db", "root", "mySQL", {
   host: "localhost",
   dialect: "mysql",
   pool: {
     max: 5,
     min: 0,
     idle: 10000
   }
 });
};
// Exports the connection for other files to use
module.exports = sequelize;