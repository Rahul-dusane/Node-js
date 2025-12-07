require("dotenv").config();         //by using this dotenv module we can use all the keys that are written into .env file . to use this we need to install the dotenv using the syntext:- npm i dotenv  we use this dot env cause the node cannot read the .env file directly thats why this package will store the all keys in to process.env so node can use it in whole project .
const express = require("express");
const app = express();
const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");
const expressSession = require("express-session");
const flash = require("connect-flash");

const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRETE,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products",  productsRouter);
app.use("/",indexRouter);

// app.get("/",function(req,res){
//     res.render("index.ejs");
// });


app.listen(3000);