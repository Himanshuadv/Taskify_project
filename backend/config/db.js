
const mongoose = require("mongoose");

const connectDb = async () => {
    let conn;

    try {
        await mongoose.connect("mongodb+srv://hthimanshu7390:hthimanshu7390@cluster0.eo1cw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });
        conn = mongoose.connection;
        console.log(`MongoDB Connected: ${conn.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDb;