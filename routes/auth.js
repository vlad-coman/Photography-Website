const express = require('express'),
        router = express.Router(),
        User = require("../models/user"),
        Photo = require("../models/photo"),
        passport = require("passport");

let isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You must be logged in to do that");
    res.redirect("/admin");
}



//--------------------------------------------------------------------------
////////////////////////////////AUTH ROUTES/////////////////////////////////
//--------------------------------------------------------------------------

//----------------Register Route---------------------------------------------//
////----------------Commented because we only want one admin------------//
// router.get("/register", function(req, res) {
//     res.render("register");
// });


//----------------Register Logic--------------------------------------//
//----------------Commented because we only want one admin------------//
// router.post("/register", function(req, res) {
//    let newUser = new User({
//     username:req.body.username,
//     firstName:req.body.firstName,
//     lastName:req.body.lastName
//    });
//    User.register(newUser, req.body.password, (err, user) => {
//             if (err) {
//                 req.flash("error",err.message)
//                 res.redirect("/");
//             } else {
//                 passport.authenticate("local")(req, res, () => {
//                     req.flash("succes","Successfully registered")
//                     res.redirect("/");
//                 });
//             }      
//     });
// });
//-----------------------------------------------------------------------//

//Login route
router.get("/admin", (req, res) => {
    res.render("admin");
});

//Handling login logic
router.post("/admin", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/admin",
    failureFlash: true
}), (req, res) => {});

//logout route
router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("/");
});

//destroy route
router.delete("/photos/:id", isLoggedIn,  (req, res) => {
    Photo.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            req.flash("error", "Something went wrong!")
            res.redirect("back");
        } else {
            req.flash("success", "Photo was deleted");
            res.redirect("/photos");
        }

    });
});


module.exports = router;