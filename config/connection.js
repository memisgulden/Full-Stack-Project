// Dependencies
var Sequelize = require("sequelize");

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