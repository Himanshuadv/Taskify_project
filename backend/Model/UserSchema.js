const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/taskify")
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log("Connection failed");
        console.error(error); // Output the actual error for debugging
    });

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
