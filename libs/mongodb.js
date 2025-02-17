import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected");
    } catch (error) {
        console.log("error is: ", error)
    }
}

export default connectMongoDB;