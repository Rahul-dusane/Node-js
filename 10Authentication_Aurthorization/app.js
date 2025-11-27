const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.render("index.ejs");
});


app.post("/create", (req, res) => {

    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            
            if (err) console.error(err);
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            });

            let token = jwt.sign({email},"secret_key");
            res.cookie("token",token);
            res.send(createdUser);
        })
    })

    
});


app.get("/login", (req, res) => {
   res.render("login.ejs");
});


app.post("/login",async (req,res) => {
    
    let user = await userModel.findOne({email:req.body.email});
    if(!user) return res.send("Something went wrong..");

    bcrypt.compare(req.body.password,user.password,function(err,result){

        let token = jwt.sign({email:user.email},"secret_key");
        res.cookie("token",token);

        if(err) return res.send("Password Is Incorrect");
        res.send("You are Logged In .");
    });
});

app.get("/logout", (req, res) => {
    res.cookie("token","");
    res.redirect("/");
});



app.listen(3000);