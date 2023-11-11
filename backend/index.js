const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require('./Model/UserSchema.js');
const Task = require('./Model/TaskSchema.js');
const connectDb = require('./config/db.js');
const app = express();
const middleware = require('./middleware')

connectDb();

// Middleware
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Allow cookies and credentials
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  session({
    secret: "qw1er2ty3ui4op5", // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true for HTTPS
    },
  })
);

// Route for user authentication
app.post("/signup", async function (req, res) {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const registeredUser = await User.findOne({ email: email });
    if (registeredUser) {
      res.status(400).json({ errorMessage: "User already registered!" });
    } else {
      newUser.save();
      req.session.userId = newUser._id; // Store user ID in the session
      res.status(200).json({ message: "User registered successfully" });
      console.log("User registered successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error registering user." });
  }
});

app.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;
    const registeredUser = await User.findOne({ email: email });
    if (registeredUser) {
      const isPasswordValid = await bcrypt.compare(password, registeredUser.password);
      if (isPasswordValid === true) {
        req.session.userId = registeredUser._id; // Store user ID in the session
        res.status(200).json({ message: "User logged in successfully" });
        console.log("User logged in successfully");
      } else {
        res.status(400).json({ errorMessage: "Invalid email or password" });
      }
    } else {
      res.status(400).json({ errorMessage: "User not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error logging in user." });
  }
});
app.get('/logout', async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Logout failed' });
  }
});

app.post('/task', async function (req, res) {
  const currentUserId = req.session.userId; // Retrieve user ID from the session
  try {
    const { title } = req.body;
    const newTask = new Task({
      userid: currentUserId,
      title: title,
      note: "This is a task",
      done: false
    });
    newTask.save();
    res.status(200).json({ message: "Task Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error adding task" });
  }
});

app.get('/get-tasks', async function (req, res) {
  const currentUserId = req.session.userId; // Retrieve user ID from the session
  const taskData = await Task.find({userid: currentUserId,
 });
  res.status(200).json({ tasks: taskData });
});
app.put('/update-task-status', async function (req, res) {
  try {
    const { taskId } = req.body;
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.done = true;

    await task.save();

    res.status(200).json({ message: "Task completed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//for authentication
app.get("/api/todos", (req, res) => {
  res.json({
    message: "hello Welcome"
  });
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
