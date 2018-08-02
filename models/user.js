const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    firstName: String,
    lastName: String

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);