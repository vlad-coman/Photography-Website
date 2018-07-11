const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    category: String    
});

module.exports = mongoose.model("Photo", photoSchema);