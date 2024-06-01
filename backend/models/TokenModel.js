import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {type: String, require: true},
    userId: {type: String, require: true},
    username: {type: String, require: true},
    userEmail: {type: String, require: true},
});

export const Token = mongoose.model("tokens", tokenSchema);