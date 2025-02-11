import mongoose from "mongoose";
const URL = process.env.URL;

const connectDB = async () => {
    if (mongoose.connection.readyState) {
        console.log("Database already connected!");
        return;
    }
    try {
        await mongoose.connect(URL)
        console.log("Database connected successfully...");
    } catch (err) {
        console.log(err);
        console.log(`Unable to connect: ${err}`);
    }
}

export default connectDB;