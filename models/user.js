import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    interest: {
        type: [String],
        required: true
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
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = User;
