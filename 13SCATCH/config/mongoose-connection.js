const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose"); // here this debuger is used for the replace of console log it is used cause we we use console log for debug at that time the console will be filled by the data wherever console log is used so by "debug" we can create the namespace so that will be stored in the .env and we can use this to debug by the namespace so we can use the same namespace at multiple places for debug the related code , in the namespace there is one more thing is palce called for which portion or module the namespace is used . 

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    dbgr("connected");   // run on the terminal to allow this debug : $env:DEBUG="development:*" after this command run nodemon app.js
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;