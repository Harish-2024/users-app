import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        age: {
            type: Number,
            required: true
        },
        mobile: {
            type: Number,
            required: true,
            unique: true
        },
        interests: {
            type: [String],
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

export default User