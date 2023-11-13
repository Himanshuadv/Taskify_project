const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require('./Model/UserSchema.js');
const Task = require('./Model/TaskSchema.js');
const Canvas = require('./Model/CanvasSchema.js');
const connectDb = require('./config/db.js');
const Note = require('./Model/NoteSchema.js');
const app = express();

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


// api code to save notes to the database
app.post('/note',async function(req,res){
  const currentUserId = req.session.userId;
  try{
    const {note,title,color,reminder} = req.body;
    const newNote = new Note({
      userid : currentUserId,
      note : note,
      title: title,
      color: color,
      reminder : reminder
    });
    newNote.save();
    res.status(200).json({ message: "Note Added Successfully" });
  }
  catch(error){
    console.log(error);
    res.status(500).json({errorMessage: "Error saving Note"});
  }
});

// api code to update note color
app.put('/update-note-color', async function(req,res){
  try {
    const { color, id } = req.body;
    const note = await Note.findOne({ _id: id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.color = color;

    await note.save();

    res.status(200).json({ message: "Note color changed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// api code to delete the note
app.delete('/delete-note', async function(req,res){
  try {
    const { id } = req.body;
    const note = await Note.deleteOne({ _id: id });

    if (note!=1) {
      return res.status(404).json({ message: "Note not found" });
    }
    else{
    res.status(200).json({ message: "Note Deleted" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// api code to update note color
app.put('/update-note-reminder', async function(req,res){
  try {
    const { id, reminder } = req.body;
    const note = await Note.findOne({ _id: id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.reminder = reminder;

    await note.save();

    res.status(200).json({ message: "Note reminder confirmed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// api code to get notes of current user
app.get('/get-notes', async function(req,res){
  const currentUserId = req.session.userId; // Retrieve user ID from the session
  const noteData = await Note.find({
    userid: currentUserId,
  });
  res.status(200).json({ notes: noteData });
});

// api code to save canvases to the database
app.post('/canvas', async function (req, res) {
  const currentUserId = req.session.userId; // Retrieve user ID from the session
  try {
    const { line, title } = req.body;
    const newCanvas = new Canvas({
      userid : currentUserId,
      lines : line,
      title : title
    })
    newCanvas.save();
    res.status(200).json({ message: "Canvas Saved Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error saving Canvas" });
  }
});

// api code to fetch canvases from database and send the info to react app
app.get('/get-canvases', async function (req, res) {
  const currentUserId = req.session.userId; // Retrieve user ID from the session
  const canvasData = await Canvas.find({
    userid: currentUserId,
 });
  res.status(200).json({ canvases: canvasData });
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
