const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs")
const User = require('./models/userModel.js')
const connectDb = require('./config/db.js')
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from the React app running on port 3000
app.use(express.json()); // Parse JSON data from incoming requests

connectDb();

// Route for user authentication
app.post("/signup", async function (req, res) {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    const registeredUser = await User.findOne({ email: email });
    if (registeredUser) {
      res.status(400).json({ errorMessage: "User already registered!" });
    } else {
      newUser.save();
      res.status(200).json({ message: "User registered successfully" });
      console.log("User registered successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error registering user." });
  }
});
app.post("/signin",async function (req,res) {
  try {
    const {email,password} = req.body;
    const registeredUser = await User.findOne({email: email});
    if(registeredUser) {
      const isPasswordValid = await bcrypt.compare(password,registeredUser.password);
      if(isPasswordValid === true) {
        res.status(200).json({ message: "User logged in successfully" });
        console.log("User logged in successfully");
      }
      else {
        res.status(400).json({errorMessage: "Invalid email or password"});
      }
    }
    else {
      res.status(400).json({errorMessage: "User not registered"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error logging in user." });
  }
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
