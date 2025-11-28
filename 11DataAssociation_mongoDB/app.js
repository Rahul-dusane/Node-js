const express = require("express");
const userModel = require("./models/user");
const postModel = require("./models/post");

const app = express();

app.get("/",function(req,res){
    res.send("hey how are you");
});

// here we have created the one user . here we are not storeing the posts cause when user create accout that is not mendetory to add the post we can add the post later also , thats why the post array is empty .
app.get("/create",async function(req,res){
    let user = await userModel.create({
        username: "xyz",
        age: 23,
        email:"xyz@gmail.com"
    });

    res.send(user);
});

//here we are creating the post of the perticuler user to create the post we need to give the userID that this product belongs to this user . but after providing the ID or creating the post we also have to update the exsisting users profile cause we also have to add that the product created recently need to set in the userModel cause when user this product belong to that user . so to keep the records of the users product we find the user and push the new productId to userModel .
app.get("/post/create",async function(req,res){
    let post = await postModel.create({
        postData: "Hello How are You",
        user: "6929889ec5c8aeb994edb612"
    });

    let user = await userModel.findOne({_id: "6929889ec5c8aeb994edb612"});
    user.posts.push(post._id);
    await user.save();
    res.send({post,user});
});

app.listen(3000);