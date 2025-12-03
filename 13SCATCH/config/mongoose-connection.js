const mongoose = require("mongoose");

mongoose
.connect("mongodb://localhost/scatch")
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.error(err);
})

module.exports = mongoose.connection;