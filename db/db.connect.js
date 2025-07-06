const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB_URI || process.env.MONGODB; 

const initializeDatabase = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        });
        console.log("MongoDB Database connected successfully");
        return true;
    } catch (error) {
        console.log("Database connection failed: ", error);
        throw error; 
    }
}

module.exports = { initializeDatabase };