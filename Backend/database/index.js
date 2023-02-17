const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
    try {
        // await mongoose.connect(process.env.MONGODB_URL);
        await mongoose.connect("mongodb://127.0.0.1:27017/itax");
        console.log('Connected to MongoDB Atls');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {connectDB};
