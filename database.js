const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
    try{

        const mongoURI = process.env.MONGODB_URI || 'mongodb://mongo:27017/mydatabase';
        console.log(mongoURI);
        
        await mongoose.connect(mongoURI);
        console.log("Mongo URI:", mongoURI);
        console.log("Database connected successfully");
    } catch(err){
        console.error("Database connection error:", err);
        throw err;
    }
}

module.exports = connectDB;