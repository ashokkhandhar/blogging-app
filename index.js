import express from "express";
import bodyParser from "body-parser";
import _ from 'lodash';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("public/styles"));

let array = new Array();

app.get('/', (req, res)=>{
    res.render("index.ejs", {posts: array});
});

app.get('/about', (req, res)=>{
    res.render("about.ejs",);
});

app.get('/contect', (req, res)=>{
    res.render("contect.ejs");
});

app.get('/create', (req, res)=>{
    res.render("form.ejs", {heading: "Create New"});
});

app.post("/submit", (req, res)=>{
    const index = req.body.index;
    if(index){
        array[index].author = req.body.author;
        array[index].postTitle = req.body.postTitle;
        array[index].postDetail = req.body.postDetail;
    } else {
        const post = {
            author: req.body.author,
            postTitle: req.body.postTitle,
            postDetail: req.body.postDetail,
            date:  new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        }
        array = [post, ...array];
    }
    res.redirect("/");
});

app.get("/posts/:title", (req, res)=>{
    const requestedTitle = _.lowerCase(req.params.title);
    for(let i = 0; i < array.length; i++){
        const storedTitle = _.lowerCase(array[i].postTitle);
        if(requestedTitle === storedTitle) {
            res.render("post.ejs", {post: array[i], index: i});
        }
    }
});

app.post("/edit", (req, res)=>{
    const index = req.body.index;
    res.render("form.ejs", {post: array[index], index, heading: "Edit"});
});

app.post("/delete", (req, res)=>{
    const index = req.body.index;
    array = array.filter(post => post !== array[index]);
    res.redirect("/");
});

app.listen(port, ()=>{
    console.log(`Server Started at http://localhost:3000/`);
});