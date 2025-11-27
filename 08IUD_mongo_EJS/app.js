const express = require("express");
const app = express();
const path = require("path");
const userModule = require("./models/user");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",function(req,res){
    res.render("index.ejs");
});

app.get("/read",async function(req,res){
    let users =  await userModule.find();
    res.render("read.ejs",{users});
});


app.post("/create", async function(req,res){
    let {name , email , image} = req.body;
    let createdUser = await userModule.create({
        name,
        email,
        image
    });

    res.redirect("/read");
});


app.get("/delete/:id",async function(req,res){
    let user = await userModule.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
});


app.get("/edit/:userid",async function(req,res){
    
    let user = await userModule.findOne({_id:req.params.userid});
    if(!user) res.redirect("/read");
    else res.render("edit.ejs",{user});
});

app.post("/update/:userid",async function(req,res){
    
    let {name,email,image} = req.body;

    let user = await userModule.findOneAndUpdate({_id: req.params.userid},{name,email,image},{new:true});
    if(!user) res.redirect("/read");
});


app.listen(3000);

