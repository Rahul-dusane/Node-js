const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engin","ejs");

// express.static is a built in middelware that is use to get access 
// the the static files like (html,css,javascript,images) without using
// the manual routes .

// use apply the statics files we have to set 
// path of the files then how we will set path ?
// we use path after the public folder . 
// eg.,<link rel="stylesheet" href="stylesheets/style.css">
//    <script src="javascripts/script.js"></script>

// if in ejs file we use the path with public folder then the static 
// files are never attached .
//

app.use(express.static(path.join(__dirname,"public")));

app.get("/",function(req,res){
    res.render("Index.ejs");
});

// Dynamic Routing :- to understand this let take one example consider there is a route like this
//                    "profile/xyz"-----
//                    "profile/mno"     |- how for this types of route do we go to creat a saperate          
//                    "profile/abc"-----   route for each cause there is only on thing after profile 
//                                         route which is changing till profile routes  noting is changes 
//                                         so here we can do like creating the dynamic routes .


// how we create the dynamic routing :- 
// -> to create the dynamic routing we put colon after the that rout which is not going to chnage ,
//    after that we anything we put after that colon will become the variable and can take any values 
//    that will provided in the browsers URL .
//    eg.,app.get("/profile/:username")  here username has become the variable now is we put in browser 
//                                       user like xyz,mno,abc will not cause error
// -> if we want to get that data which is store in dynamic routing like in the browsers url we can get it .
//    eg., res.send(req.params.username);
// -> we can alos put multiple dynamic values in routes like give below
//    eg., app.get("/profile/:username/:age")
// -> this is about dynamic routing .

app.get("/profile/:username",function(req,res){
    res.send(`Welcome,${req.params.username}`);
})

app.get("/profile/:username/:age",function(req,res){
    res.send(`welcome,${req.params.username},your age is,${req.params.age}`);
})

app.listen(3000,function(){
    console.log("Its running");
    console.log(__dirname,__filename);
});