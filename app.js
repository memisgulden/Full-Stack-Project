const express = require ('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");

const app = express ();

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

app.listen(3000, () => {
    console.log("app now listening for requests on port 3000");
});