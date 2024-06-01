import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    email: String,
    password: String,
});

export const User = mongoose.model("user", userSchema);