import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

let array = new Array();

app.get('/', (req, res)=>{
    res.render("index.ejs", {blogs: array});
});

app.get('/create', (req, res)=>{
    res.render("create.ejs");
});

app.post("/submit", (req, res)=>{
    const author = req.body['author'];
    const title = req.body['title'];
    const detail = req.body['detail'];
    const date = new Date().toLocaleDateString();
    array = [{ author, title, detail, date }, ...array];
    res.redirect("/");
});

app.post('/view', (req, res)=>{
    const index = req.body['index'];
    res.render("view.ejs", {blog: array[index], index});
});

app.post("/edit", (req, res)=>{
    const index = req.body['index'];
    res.render("edit.ejs", {blog: array[index], index});
});

app.post("/editSubmit", (req, res)=>{
    const index = req.body['index'];
    array[index].author = req.body['author'];
    array[index].title = req.body['title'];
    array[index].detail = req.body['detail'];
    res.redirect("/");
});

app.post("/delete", (req, res)=>{
    const index = req.body['index'];
    array = array.filter(blog => array[index] !== blog);
    res.redirect("/");
});

app.listen(port, ()=>{
    console.log(`Server Started at http://localhost:3000/`);
});