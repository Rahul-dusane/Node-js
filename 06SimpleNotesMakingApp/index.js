// In this file we are creating Simple Notes Making App .
// -> this app read files from the "./files" folder and render list on home page .
// -> route "/files/:filename" reads the requested file and render "show.ejs" with content .
// -> POST "/create" will write a new file in "./files" using the title (spaces removed) as filename
//    and the description as file content .
// -> we use express.json() and express.urlencoded() to parse request body and form data .
// -> fs module used for file operations : readdir, readFile, writeFile .

const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engin","ejs")
app.set(express.static(path.join(__dirname,"public")));




app.get("/",function(req,res){
    
    fs.readdir("./files",function(err,data){
        if(err) console.error(err);
        else res.render("Index.ejs",{files:data});
    });
    
});


app.get("/files/:filename",function(req,res){
    
    fs.readFile(`./files/${req.params.filename}`,"utf-8" ,function(err,data){
        res.render("show.ejs",{filename: req.params.filename, data:data});
    });
    
});

app.get("/edit/:filename",function(req,res){
    res.render("edit.ejs",{filename: req.params.filename});
})

app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.discription,function(err){
        if(err) console.log(err);
        else res.redirect("/");
    });
});

app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.previous_title}`,`./files/${req.body.new_title}`,function(err){
        res.redirect("/");
    });
});



app.listen(3000);