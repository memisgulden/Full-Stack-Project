// *** Dependencies
const express = require ('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");

var bodyParser = require("body-parser");
// Sets up the Express App
const app = express();
var PORT = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// // Static directory
app.use(express.static("public"));

// Routes
// require("./routing/html-routes.js")(app);
require("./routing/api-routes.js")(app);

app.use(require('body-parser').urlencoded({ extended: true }));

// set up view engine
app.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("connected to mongodb");
})


//cookie age is one day
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
}))

//initialize passport
app.use( passport.initialize());
app.use( passport.session());


//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.get("/", (req,res) => {
    res.render('home', {user: req.user});
})

app.listen(PORT, () => {
    console.log("test app now listening for requests on port 3000");
});

