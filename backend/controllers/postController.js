import { Post } from '../models/PostModel.js';

export const createPost = async (req, res) => {
    const { username, title, detail, isPrivate } = req.body;
    const newPost = new Post({
        username: username,
        title: title,
        detail: detail,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        isPrivate: isPrivate,
    });
    
    try {
        const post = await newPost.save();
        console.log("New Post:", post);
        return res.status(200).send("Post created successfully");
    } catch(error) {
        return res.status(500).send(error);
    }
}
        
export const allPosts = async (req, res) => {
    try {
        const response = await Post.find({isPrivate: false});
        return res.status(200).send(response);
    } catch(error) {
        return res.status(500).send(error);
    }
}

export const viewPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        return res.status(200).send(post);
    } catch(error) {
        return res.status(500).send(error);
    }
}

export const myPosts = async (req, res) => {
    const username = req.query.username;
    try {
        const response = await Post.find({ username: username });
        return res.status(200).send(response);
    } catch(error) {
        return res.status(500).send(error);
    }
}

export const editPost = async (req, res) => {
    const { postId, title, detail, isPrivate } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, {
            title: title,
            detail: detail,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            isPrivate: isPrivate
        });
        console.log({updatedPost});
        return res.status(200).send("Post updated successfully");
    } catch(error) {
        return res.status(500).send(error);
    }
}

export const deletePost = async  (req, res) => {
    const postId = req.params.postId;
    console.log(postId);
    try {
        const response = await Post.deleteOne({_id: postId});
        console.log(response);
        return res.status(200).send("Post deleted successfully");
    } catch(error) {
        return res.status(500).send(error);
    }
}