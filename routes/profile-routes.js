const router = require('express').Router();

//check if the user is logged in
const authCheck = (req, res, next) => {
    if (!req.user) {
        //executes if user is not logged in
        res.redirect("/auth/login");
    } else {
        //if they are loggin in 
        next();

    }
};

router.get("/", authCheck, (req, res) => {
    res.render("profile", {user: req.user});
})



module.exports = router;