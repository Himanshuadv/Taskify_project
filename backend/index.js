const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require('./Model/UserSchema.js');
const Task = require('./Model/TaskSchema.js');
const Canvas = require('./Model/CanvasSchema.js');
const connectDb = require('./config/db.js');
const Note = require('./Model/NoteSchema.js');
const Daily = require('./Model/DailySchema.js');
const GoogleAuth = require('./Model/GoogleAuthSchema.js');
const schedule = require('node-schedule');
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

app.post("/signup-google", async function (req, res) {
  try {
    const { name, email, password } = req.body;

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new GoogleAuth({
      name: name,
      email: email,
    });

    const registeredUser = await GoogleAuth.findOne({ email: email });
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

app.post("/signin-google", async function (req, res) {
  try {
    const { email, password } = req.body;
    const registeredUser = await GoogleAuth.findOne({ email: email });
    if (registeredUser) {
      req.session.userId = registeredUser._id;
      res.status(200).json({ message: "User logged in successfully" });
      console.log("User logged in successfully");
    } else {
      res.status(400).json({ errorMessage: "User not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error logging in user." });
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

app.post('/task-added-through-editor', async function (req, res) {
  const currentUserId = req.session.userId; // Retrieve user ID from the session

  try {
    const { title, note, checklist, dueDate, tags } = req.body;

    // Split tags at spaces or commas and trim each tag
    const tagsArray = tags.split(/[ ,]+/).map(tag => tag.trim());

    const newTask = new Task({
      userid: currentUserId,
      title: title,
      note: note,
      checklist: checklist,
      done: false,
      endDate: dueDate,
      tags: tagsArray,
    });

    await newTask.save();

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
    const deleteNoteCounter = await Note.deleteOne({ _id: id });

    if (deleteNoteCounter.deletedCount!=1) {
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

//api code to add daily to db
app.post('/dailies', async function (req, res) {
  const currentUserId = req.session.userId; // Retrieve user ID from the session
  try {
    const { title } = req.body;
    const newDaily = new Daily({
      userid: currentUserId,
      title: title,
      note: "This is a daily",
      done: false
    });
    newDaily.save();
    res.status(200).json({ message: "Daily Task Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error adding Daily Task" });
  }
});

// api code to fetch daily
app.get('/get-dailies', async function (req, res) {
  const currentUserId = req.session.userId; // Retrieve user ID from the session
  const dailyData = await Daily.find({userid: currentUserId,
 });
  res.status(200).json({ dailies: dailyData });
});

// api code to complete a daily
app.put('/update-daily-status', async function (req, res) {
  try {
    const { dailyId } = req.body;
    const daily = await Daily.findOne({ _id: dailyId });

    if (!daily) {
      return res.status(404).json({ message: "Daily Task not found" });
    }

    daily.done = true;

    await daily.save();

    res.status(200).json({ message: "Daily Task completed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Resets the done field of daily to false when new day starts.
schedule.scheduleJob('0 0 * * *', async () => {
  try {
    // Update all dailies to set 'done' to false
    await Daily.updateMany({}, { $set: { done: false } });
    console.log('Dailies reset for a new day.');
  } catch (error) {
    console.error('Error resetting dailies:', error);
  }
});

//To delete a daily task
app.delete("/delete-daily-task", async (req, res) => {
  try {
    const { dailyId } = req.body;

    // Use findById for simplicity and conciseness
    const daily = await Daily.findById(dailyId);

    if (!daily) {
      return res.status(404).json({ message: "Daily Task not found" });
    }

    const deletionResult = await Daily.deleteOne({ _id: dailyId });

    if (deletionResult.deletedCount === 1) {
      res.status(200).json({ message: "Daily Task deleted" });
    } else {
      res.status(500).json({ message: "Failed to delete Daily Task" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
