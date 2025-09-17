
const mongoose = require("mongoose");

if (!process.env.DATABASE) {
    throw new Error("❌ DATABASE env variable missing");
  }
 
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
const connectDb = async () => {
    let conn;

    try {
        await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
        conn = mongoose.connection;
        console.log(`MongoDB Connected: ${conn.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDb;
