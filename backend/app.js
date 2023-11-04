const express = require('express');
const User = require('./Model/UserSchema');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("error");
  }
});



app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = {
      name: name,
      email: email,
      password: password
    };
  
    try {
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail) {
        res.json("exist");
      } else {
        await User.create(newUser); 
        console.log("Saved successfully");
        res.json("notexist");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("error");
    }
  });
  
app.listen(8000, () => {
  console.log("port connected");
});
