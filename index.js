const express = require("express");
const app = express();
const path = require("path");
const {v4:uuidv4} = require("uuid");
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}));

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: 'sakshiSaindane',
        content: "Learning Express.js is becoming fun! Today I created my first CRUD application."
    },
    {
        id: uuidv4(),
        username: 'rahulKumar',
        content: "Small progress every day leads to big achievements. Keep coding and keep growing."
    },
    {
        id: uuidv4(),
        username: 'snehaGupta',
        content: "Every project teaches something new. That's what makes web development exciting."
    },
];


app.get("/posts", (req, res) => { 
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", {post});
});

app.get("/posts/:id/:edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id", (req, res)=> {
    let {id} = req.params;
    let {content} = req.body;
    let post = posts.find((p) => p.id === id);
    post.content = content;
    res.redirect("/posts")
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("server is started now");
});
