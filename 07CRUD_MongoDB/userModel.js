const mongoose = require("mongoose"); //to work with the mongodb we need to to install the mongoose package .

mongoose.connect(`mongodb://localhost/user`); // this syntext will used to make the connection to the database or create the database .

const userSchema = mongoose.Schema({   // this is the userSchema in this case or we can say a table or the collection schema which will tell the table what are the things that are going to store in the table with there dataTypes .
    name:String,
    email:String
});

//to perform the CRUD operation with the mongoDB we have to implement the model without the model we cannot do the CRUD operation with mongodb .
module.exports = mongoose.model("user",userSchema); // here the user will use the userSchema .
// so here we have create the model of name user but in 
// mongodb the model will created with name "users" (pural,inGujrati(બહુવચન))
// and if we give the pural name in the syntext then it will never
// use the double s still it store the "users" not "userss" .


// why we have use module.exports :-
//
// -> if we want so we can do the CRUD operation in 
// this file but we dont what that we will do the CRUD 
// operation on the diff routes to do that we need this 
// connection file so that why we exprest the models 
// cause models contains the schema of the table(collection) 
// on that we are going to do CRUD . 

// here exports is the property not the method thats why we use the equalto(=) . 

