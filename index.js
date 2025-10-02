import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import fs, { readFileSync } from "fs"
import { title } from "process";

function sanitizeTitle(title) {
    title=title.toLowerCase()
    title=title.replace(/ /g, "_")       // spaces → underscores
    title=title.replace(/[^a-z0-9_]/g, ""); // remove special chars
    return title
}

var app=express();
const port=3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var blogs=[]
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index",{blogs});
})
app.get("/add",(req,res)=>{
    res.render("createBlog");
})
app.post("/newBlog",(req,res)=>{

    const file=sanitizeTitle(req.body.blogTitle);
    var file_name=file+".txt";
    var file_path="./blogs/"+file_name;
    console.log(`name of file is ${file}`);

    var data=`Title:${req.body.blogTitle} \n ${req.body.blogContent}`;
    fs.writeFileSync(file_path,data);
    console.log("blog posted successfully ");

    var blog={title:req.body.blogTitle,content:req.body.blogContent,file_name:file_name};
    blogs.push(blog);
    console.log(blogs);

    res.render("blog.ejs",{title:req.body["blogTitle"],content:req.body["blogContent"]});
})

app.get("/allBlogs",(req,res)=>{
    res.render("allBlogs",{blogs});
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/blog/:file_name",(req,res)=>{
    var file_name=req.params.file_name;
    var file_path="./blogs/"+file_name;
    try{
        var content=readFileSync(file_path,"utf8");
        const blog = blogs.find(b => b.file_name === file_name);
        res.render("blog",{title:blog?blog.title:file_name.replace(".txt","") ,content:blog?blog.content:content});
    }
    catch(err){
        res.status(404).send("blog not found");
    }
})
app.get("/search",(req,res)=>{
    const query=req.query.query? req.query.query.toLowerCase() : "";
    const results = blogs.filter(blog => 
        blog.title.toLowerCase().includes(query)
    );

    res.render("allBlogs", { blogs: results });
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})