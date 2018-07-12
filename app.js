const express        = require("express"),
      mongoose       = require("mongoose"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override"),
      app            = express(),
      bodyParser     = require("body-parser"),
      flash          = require("connect-flash"),
      nodemailer     = require("nodemailer"),
      Photo          = require("./models/photo"),
      User           = require("./models/user");

const photosRoutes = require("./routes/photos"),
      authRoutes   = require("./routes/auth"),
      menuRoutes   = require("./routes/menu");

require('dotenv').config()
mongoose.connect(process.env.DB_URL);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//Session setup
app.use(require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
// Passport.js config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Setting up currentUser and flash messages to be available in views 
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", photosRoutes);
app.use("/", authRoutes);
app.use("/", menuRoutes);

app.listen(process.env.PORT, function () {
    console.log("Server has started");
});