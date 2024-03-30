import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();
const port = 3000;

// middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("public/styles"));

// db connection
mongoose.connect(process.env.URL);

const postSchema = new mongoose.Schema({
    author: String,
    postTitle: String,
    postDetail: String,
    date: String,
});

const Post = mongoose.model("post", postSchema);

app.get('/', async (req, res)=>{
    try {
        const posts = await Post.find();
        res.render("index.ejs", {posts: posts});
    } catch (error) {
        res.send(error.message);
    }
});

// routes
app.get('/about', (req, res)=>{
    res.render("about.ejs",);
});

app.get('/contect', (req, res)=>{
    res.render("contect.ejs");
});

app.get('/create', (req, res)=>{
    res.render("form.ejs", {heading: "Create New"});
});

app.post("/submit", async (req, res)=>{
    const reqId = req.body.id;
    if(reqId){
        try {
            const responce = await Post.updateOne({_id: reqId}, {
                author: req.body.author,
                postTitle: req.body.postTitle,
                postDetail: req.body.postDetail,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            });
            console.log("Post updated successfully..!\n", responce);
        } catch (error) {
            res.send(error.message);
        }
    } else {
        try {
            const post = new Post({
                author: req.body.author,
                postTitle: req.body.postTitle,
                postDetail: req.body.postDetail,
                date:  new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            });
            const responce = await post.save();
            console.log("New post created successfully..!\n", responce);
        } catch (error) {
            res.send(error.message);
        }
    }
    res.redirect("/");
});

app.get("/posts/:id", async (req, res)=>{
    const reqId = req.params.id;
    try {
        const post = await Post.findOne({_id: reqId});
        res.render("post.ejs", {post: post});
    } catch (error) {
        res.send(error.message);
    }
});

app.post("/edit", async (req, res)=>{
    const reqId = req.body.id;
    try {
        const post = await Post.findOne({_id: reqId});
        res.render("form.ejs", {post: post});
    } catch (error) {
        res.send(error.message);
    }
});

app.post("/delete", async (req, res)=>{
    const reqId = req.body.id;
    try {
        const responce = await Post.deleteOne({_id: reqId});
        console.log(responce);
        res.redirect("/");
    } catch (error) {
        res.send(error.message);
    }
});

app.listen(port, ()=>{
    console.log(`Server Started at http://localhost:3000/`);
});