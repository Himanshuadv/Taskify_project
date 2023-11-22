const mongoose = require('mongoose');

const userGoogleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
});

const GoogleAuth = mongoose.model("GoogleAuth", userGoogleSchema);

module.exports = GoogleAuth;