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

var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


///--------------------------------------------------------------------------
////////////////////////////////PHOTO ROUTES/////////////////////////////////
//---------------------------------------------------------------------------

// index route
router.get("/photos", function(req, res) {
    if(req.query.search){
        Photo.find({category:req.query.search},(err,foundPhotos)=>{
            if(err){
                req.flash('error', "No photos in this category");
            } else {
                res.render("photos/index",{photos:foundPhotos}); 
            }
        });
    } else {
        Photo.find({},(err,foundPhotos)=>{
            if(err){
                req.flash('error', "No photos!");
            } else {
                res.render("photos/index",{photos:foundPhotos}); 
            }
        });
    }
    
    
});

//new route
router.get("/photos/new", isLoggedIn, function(req, res) {
    res.render("photos/new");
});


// create route
router.post("/photos", upload.single('image'), isLoggedIn, (req, res) => {
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
        if (err) {
            console.log(err);
        }
        req.body.photo.image = result.secure_url;
        req.body.photo.imageId = result.public_id;
 
        Photo.create(req.body.photo, (err, photo) => {
            if (err) {
                req.flash('error', err.message);
                res.redirect("back");
            } else {
                req.flash('success', "Photo successfully added");
                res.redirect("/photos/" +"?search="+photo.category);
            }
        });
    });
});

module.exports = router;