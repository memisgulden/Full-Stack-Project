const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require("../models/user-model");

//keys is currently not working!!
// const keys = require("./keys");

module.exports = {
    google: {
        clientId: "861916271026-kbin80qeojrcjooimk9u7frr5kr6e4u0.apps.googleusercontent.com",
        clientSecret: "f43kH6X2CjhicgYKzb1ETlZf"
    },
    mongodb: {
        dbURI: "mongodb://gmem:Pirates1@ds063140.mlab.com:63140/oauth_db"
    }

};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
});


//using the keys.js is not working! ToDO: Move into keys //
passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL: "https://arcane-citadel-23385.herokuapp.com/auth/google/redirect",
        clientID: "861916271026-kbin80qeojrcjooimk9u7frr5kr6e4u0.apps.googleusercontent.com",
        clientSecret: "f43kH6X2CjhicgYKzb1ETlZf"


    }, (accessToken, refreshToken, profile, done) => {
        // passport call back function, save user
        console.log('passport callback function fired');
        console.log("profile" + profile);

        // check if user already exists in our DB
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            err = null;
            if (currentUser) {
                //already have this user
                console.log("user is:" + currentUser);
                done(null, currentUser);
            } else {
                // if not, create new user in DB
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.image.url,
                    // useremail: profile.email,
                }).save().then((newUser) => {
                    console.log("new user created" + newUser);
                    done(null, newUser);
                })
            }
        })


    }

));

