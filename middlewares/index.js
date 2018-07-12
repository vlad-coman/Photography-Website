const User           = require("../models/user"),
      Photo          = require("../models/photo"),
      middlewareObj  = {};

middlewareObj.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You must be logged in to do that");
	res.redirect("/admin");
}

module.exports = middlewareObj;