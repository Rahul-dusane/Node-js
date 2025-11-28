const mongoose = require("mongoose");



const postSchema = mongoose.Schema({
    postdata:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,     //here we are going to store the userId as objectId so it show that whcih post belongs to which user . 
        ref:"user"
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("post",postSchema);