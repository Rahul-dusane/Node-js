const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/testingDB");

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    age:Number,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,    //here we are going to store the postId in objectID form it can validate correctly when reqiure . but here we also need to tell that this id is belong to which model here the post id belong to the postModel . so here we have give the reference of the post . this postid is used to tell that how many posts belongs to perticuler user .
            ref: "post"
        }
    ]
});

module.exports = mongoose.model("user",userSchema);