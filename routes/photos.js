const express     = require('express'),
      router      = express.Router(),
      User        = require("../models/user"),
      Photo       = require("../models/photo"),
      passport    = require("passport"),
      middleware  = require("../middlewares");

// Settings for Cloudinary
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
var upload = multer({
  storage: storage,
  fileFilter: imageFilter
})

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Index Route
router.get("/photos", function (req, res) {
  if (req.query.search) {
    Photo.find({
      category: req.query.search
    }, (err, foundPhotos) => {
      if (err) {
        req.flash('error', "No photos in this category");
      } else {
        res.render("photos/index", {
          photos: foundPhotos
        });
      }
    });
  } else {
    Photo.find({}, (err, foundPhotos) => {
      if (err) {
        req.flash('error', "No photos!");
      } else {
        res.render("photos/index", {
          photos: foundPhotos
        });
      }
    });
  }
});

// New Route
router.get("/photos/new", middleware.isLoggedIn, function (req, res) {
  res.render("photos/new");
});

// Create Route
router.post("/photos", upload.single('image'), middleware.isLoggedIn, (req, res) => {
  cloudinary.v2.uploader.upload(req.file.path, function (err, result) {
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
        res.redirect("/photos/" + "?search=" + photo.category);
      }
    });
  });
});

module.exports = router;