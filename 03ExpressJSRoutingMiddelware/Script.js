
// If any one reffering this doc/code then start learing from the express 
// then routes then come to middleware , even we have write the middleware 
// code and explanation first .

const express = require("express");
const app = express();


// Middleware :- In express.js the Middleware is the peace of code that executes 
//              after the request reaches to the server but before the route 
//              handler is called (like if client send the request to go at 
//              /about route then efore going to there this middleware will executes) .

// how to use the middleware :-

// 1.make use of use() method : use() method will take one call-back function contains 
//                              3 parameters function(req,res,next){...} .
//      


// It can be used in Forntend and Backend .

app.use(function(req,res,next){         // -> But here we can see the loder is contigusly 
    console.log("I Am Middleware..."); //     loading and not stoping even we got middleware message .
    next();
})


// here, the get is .............
// it takes 2 parameters for now one is routes(URL)
// second is call back function contains (req,res) .
// here "/" this means the current route .  

app.get("/",function(req,res){   
    res.send("I Am Good .");    
});                              

// for the given block "/profile" it will route to profile page (new profile page) .  
app.get("/profile",function(req,res){
    res.send("How Are You ?");
})

app.get("/post",function(req,res,next){
    return next(Error("Something went wrong ..."));
});

// app.get("/profile/post",function(req,res,next){
//     return next(Error("Something went wrong ..."));   //We can this way also give the routes .
// });

app.use(function(err,req,res,next){
    console.error(err);
    res.status(500).send("Somthing Broke!");
})

app.listen(3000);          //this listen() method will used to run the server .

// when ever we make the changes in the server that time we nned to stope the server 
// and then re-run the server to appliy the changes . 
// to prevent from that we have used one package syntext :- npm i nodemon -g  (here g stand for gloabal means we only need to install it once) .
