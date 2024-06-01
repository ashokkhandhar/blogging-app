import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    username: String,
    title: String,
    detail: String,
    date: String,
    isPrivate: Boolean,
});

export const Post = mongoose.model("post", postSchema);