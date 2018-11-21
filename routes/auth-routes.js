const router = require('express').Router();
const passport = require("passport");

// router.use(passport.initialize());

// auth login
router.get('/login', (req,res) => {
    res.render('login', {user: req.user});
});

//auth logout
router.get('/logout', (req,res) => {
    //handle with passport
    req.logout();
    res.redirect("/");
});

//auth with google
router.get('/google', passport.authenticate('google', {
    // this is what we want to get from the user 
    scope: ['profile']
}));

router.get('/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // res.send(req.user);
    //send user to a profile page
    res.redirect("/profile/");
  });

module.exports = router;