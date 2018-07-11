const express = require('express'),
        router = express.Router(),
        User = require("../models/user"),
        passport = require("passport");

router.get("/", function(req, res) {
    res.render("home");
});

router.get("/contact", function(req, res) {
    res.render("contact");
});

router.post("/contact", function(req, res) {
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PW
        }
    });
    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: process.env.GMAIL_USER,
        subject: 'New message recieved from Roxana Photography Website',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function(error, response) {
        if (error) {
            req.flash('error', "Something went wrong!");
            res.redirect("/contact");
        } else {
            req.flash('success', "Message was sent!");
            res.redirect("back");
        }
    });

});


router.get("/about", function(req, res) {
    res.render("about");
}); 

module.exports = router;