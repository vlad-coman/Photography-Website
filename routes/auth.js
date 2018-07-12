const express    = require('express'),
      router     = express.Router(),
      User       = require("../models/user"),
      Photo      = require("../models/photo"),
      passport   = require("passport"),
      middleware = require("../middlewares");

// Register Route
//----commented because we only want one admin and nobody else to be able to register
// router.get("/register", function(req, res) {
//     res.render("register");
// });


// Handling Register Logic
//----commented because we only want one admin and nobody else to be able to register
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

// Login Route
router.get("/admin", (req, res) => {
    res.render("admin");
});

// Handling Login logic
router.post("/admin", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/admin",
    failureFlash: true
}), (req, res) => {});

// Logout Route
router.get("/logout", middleware.isLoggedIn, (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("/");
});

// Destroy Route
router.delete("/photos/:id", middleware.isLoggedIn, (req, res) => {
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