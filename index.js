import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import 'dotenv/config';

const app = express();
const port = 3000;
const saltRounds = 10;

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("public/styles"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            // session age is 30 days
            maxAge: 1000 * 60 * 60 * 24 * 30,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.info('DB Connected'))
.catch((error) => console.info(`DB connection error: ${error.message}`));

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
});

const postSchema = new mongoose.Schema({
    author: userSchema,
    postTitle: String,
    postDetail: String,
    date: String,
    isPrivate: Boolean,
});

const User = mongoose.model("user", userSchema);
const Post = mongoose.model("post", postSchema);

// Authentication
passport.use(
    new Strategy(async function verify(username, password, cb) {
        try {
            const existingUser = await User.findOne({ username: username });
            if (existingUser) {
                bcrypt.compare(password, existingUser.password, (err, valid) => {
                    if (err) {
                        //Error with password check
                        console.error("Error comparing passwords:", err);
                        return cb(err);
                    } else {
                        if (valid) {
                            //Passed password check
                            return cb(null, existingUser);
                        } else {
                            //Did not pass password check
                            return cb(null, false);
                        }
                    }
                });
            } else {
                return cb("User not found"); 
            }
        } catch (error) {
            return cb(error);
        }
    })
);
  
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

// Routes
app.get('/', async (req, res)=>{
    try {
        const posts = await Post.find({ isPrivate: false });
        if (req.isAuthenticated()) {
            res.render("index.ejs", {posts: posts, user: req.user});
        } else {
            res.render("index.ejs", {posts: posts});
        }
    } catch (error) {
        res.send(error.message);
    }
});

app.get('/register', (req, res) => {
    res.render("register.ejs");
});

app.get('/signin', (req, res) => {
    res.render("signin.ejs");
});

app.get('/create-post', (req, res)=>{
    res.render("post-form.ejs", {heading: "Create New", user: req.user});
});

app.get('/user/:username', async (req, res) => {
    const paramsUsername = req.params.username;
    try {
        const existingUser = await User.findOne({ username: paramsUsername });
        if(existingUser) {
            const posts = await Post.find({ author: existingUser });
            const publicPosts = await Post.find({ author: existingUser, isPrivate: false });
            const postCount = await Post.countDocuments({ author: existingUser });
            const publicPostCount = await Post.countDocuments({ author: existingUser, isPrivate: false });
            // if user is loged in
            if(req.user) {
                // viewing own profile
                if(req.user.username == existingUser.username) {
                    res.render("profile.ejs", {posts: posts, publicPostCount: publicPostCount, privatePostCount: postCount-publicPostCount, postCount: postCount, userInfo: existingUser, user: req.user, self: true});
                } else {
                    res.render("profile.ejs", {posts: publicPosts, publicPostCount: publicPostCount, userInfo: existingUser, user: req.user});
                }
            } else {
                res.render("profile.ejs", {posts: publicPosts, publicPostCount: publicPostCount, userInfo: existingUser});
            }
        } else {
            res.send("User not found");
        }
    } catch (error) {
        res.send(error.message);
    }
});

app.get("/my-posts", async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user });
        res.render("my-posts.ejs", {posts: posts, user: req.user});
    } catch (error) {
        res.send(error.message);
    }
});

app.get('/profile-settings', (req, res)=>{
    res.render("profile-settings.ejs", {user: req.user});
});

app.get('/update-profile', (req, res) => {
    res.render("update-profile.ejs", {user: req.user});
});

app.get('/delete-profile', async (req, res) => {
    try {
        const response1 = await User.deleteOne({ username: req.user.username });
        console.log("User deleted successfully..!\n", response1);

        const response2 = await Post.deleteMany({ author: req.user });
        console.log("Posts of user are deleted successfully..!\n", response2);
        res.redirect("/");
    } catch (error) {
        res.send(error);
    }
});

app.post('/register', async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    try {
        const existingUser = await User.findOne({ username : username });
        if(existingUser) {
            res.send("User already exiests. Try loggin in.");
        } else {
            bcrypt.hash(password, saltRounds, async (error, hash) => {
                if(error) {
                    console.log("Error hashing password: ", error);
                } else {
                    const newUser = new User({
                        name: name,
                        username: username,
                        password: hash,
                    });
                    const user = await newUser.save();
                    req.login(user, (error) => {
                        if(error) console.log(error);
                        res.redirect("/");
                    });
                }
            });
        }
    } catch (error) {
        res.send(error.message);
    }
});

app.post('/signin', 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/signin",
    })
);

app.post('/update-profile', async (req, res) => {
    const newUsername = req.body["new username"];
    const oldPassword = req.body["old password"];
    const newPassword = req.body["new password"];
    bcrypt.compare(oldPassword, req.user.password, async (err, valid) => {
        if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            res.send(err);
        } else {
            if (valid) {
                //Passed password check
                try {
                    bcrypt.hash(newPassword, saltRounds, async (error, hash) => {
                        if(error) {
                            console.log("Error hashing password: ", error);
                        } else {
                            const response1 = await Post.updateMany({author: req.user}, {
                                ["author.username"]: newUsername,
                                ["author.password"]: hash,
                            });
                            console.log("Posts username detail updated successfully..!\n", response1);
                            const response2 = await User.updateOne({username: req.user.username}, {
                                username: newUsername,
                                password: hash,
                            });
                            console.log("User updated successfully..!\n", response2);
                        }
                    });
                    res.redirect("/profile-settings");
                } catch (error) {
                    res.send(error.message);
                }
            } else {
                //Did not pass password check
                res.send("wrong password");
            }
        }
    });
});

app.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// post routes
app.post("/publish", async (req, res)=>{
    const reqId = req.body.id;
    if(reqId){
        try {
            const response = await Post.updateOne({_id: reqId}, {
                author: req.user,
                postTitle: req.body.postTitle,
                postDetail: req.body.postDetail,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                isPrivate: req.body.isPrivate ? true : false,
            });
            console.log("Post updated successfully..!\n", response);
            res.redirect("/my-posts");
        } catch (error) {
            res.send(error.message);
        }
    } else {
        try {
            const post = new Post({
                author: req.user,
                postTitle: req.body.postTitle,
                postDetail: req.body.postDetail,
                date:  new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                isPrivate: req.body.isPrivate ? true : false,
            });
            const response = await post.save();
            console.log("New post created successfully..!\n", response);
            res.redirect("/");
        } catch (error) {
            res.send(error.message);
        }
    }
});

app.get("/post/:id", async (req, res)=>{
    const reqId = req.params.id;
    try {
        const post = await Post.findOne({ _id: reqId });
        res.render("full-post.ejs", {post: post, user: req.user});
    } catch (error) {
        res.send(error.message);
    }
});

app.post("/edit", async (req, res)=>{
    const reqId = req.body.id;
    try {
        const post = await Post.findOne({ _id: reqId });
        res.render("post-form.ejs", {post: post, user: req.user});
    } catch (error) {
        res.send(error.message);
    }
});

app.post("/delete", async (req, res)=>{
    const reqId = req.body.id;
    try {
        const response = await Post.deleteOne({_id: reqId});
        console.log(response);
        res.redirect("/");
    } catch (error) {
        res.send(error.message);
    }
});

app.listen(port, ()=>{
    console.log(`Server Started at http://localhost:3000/`);
});