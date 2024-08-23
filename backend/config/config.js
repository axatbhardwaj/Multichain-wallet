import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

// console.log(mongoURI);

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection failed");
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;