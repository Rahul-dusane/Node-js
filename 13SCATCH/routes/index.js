const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/",function(req,res){
    let error = req.flash("error") || [];
    res.render("index.ejs",{ error, loggedin: false });
});

router.get("/shop",isLoggedIn,async function(req,res){
    console.log("im on shop...")
    let products = await productModel.find();
    res.render("shop.ejs",{ products });
});

router.get("/addtocart/:productid",isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    res.redirect("/shop");
});

router.get("/cart",isLoggedIn,async function(req,res){
    let user = await userModel
        .findOne({email: req.user.email})
        .populate("cart");

        const bill = (Number(user.cart[0].price) + 20) - Number(user.cart[0].discount); 

    res.render("cart.ejs",{ user, bill});
});

router.get("/logout",isLoggedIn,function(req,res){
    res.render("shop.ejs");
})
module.exports = router;