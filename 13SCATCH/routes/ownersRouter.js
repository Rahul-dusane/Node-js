const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");
const { debug } = require("console");

if(process.env.NODE_ENV === "development"){
    router.post("/create",async function(req,res){
        let owner = await ownerModel.find();
        if(owner.length > 0){
           return res.status(503).send("You dont have permission t0 create a new owner ."); 
        }

        let {fullname,password,email} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });

        res.status(201).send(createdOwner);
    });
}

router.get("/admin",function(req,res){
    let success = req.flash("success");
    res.render("createproducts.ejs",{success});
});

console.log(process.env.NODE_ENV); // to run this thing do this command in cmd:- $env:NODE_ENV="development" after run this nodemon app.js


module.exports = router;