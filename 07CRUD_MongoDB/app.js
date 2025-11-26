

// mongoDB is the ODM ORM . mongoose will help to talk with the node server .

const express = require("express");
const app = express();

const userModel = require("./userModel"); //this file is imported to get the data of the userModel that we have exported .

app.get("/",function(req,res){
    res.send("hey");
});


//for this project we will get all the out put in the 
//browser in the json format cause we have not use the ejs .

// which ever operation from the CRUD of the mongoose will be the async operation by default -said by Mongoose .
// cause mode.create is the async function we need to use the "await" keyword before the "model" keyword and we 
// we need to put the "async" key word to its nearest function .  
app.get("/create", async function(req,res){
    let createdUser = await userModel.create({  // IN the mongoose this model.create() is the async code so  
        name:"xyz",                             // it will run in the side stack so after word code will display  
        email:"xyz@123gmail.com"                // first then this line output will appear .
    });
    res.send(createdUser);
});

// after runing this "/create" route when we go to the browser at that 
// we can see the name and email at the same time we also get the id 
// When you don't provide an _id value when saving a document (like in your example), MongoDB automatically generates a 12-byte value called an ObjectID.
// This ObjectID is made up of several parts, which helps ensure it's unique even if you have many servers saving data at the same time:
// Timestamp (4 bytes): The time the document was created.
// Machine Identifier (3 bytes): A unique identifier for the machine/server where the document was created.
// Process ID (2 bytes): The ID of the process running MongoDB on that machine.
// Counter (3 bytes): A simple counter that increments for each document created by that process.


//this route is used to update the name of the existsing user .
app.get("/update", async function(req,res){
    let updatedUser = await userModel.findOneAndUpdate({name:"xyz"},{name:"mno"},{new:true});  // .findOneAndUpdate(where,update,{new:true})function will take the 3 parameter   
    res.send(updatedUser);                                                                     // first will be where to update,socond what to update,{new:true}     
});                                                                                            // to get the user , all the parameters passed as object if we want to pass the default values . 

app.get("/read",async function(req,res){
    let users = await userModel.find({name:"mno"});   // if we not provide any parameters to .find() method will used to read all the users ,  
    res.send(users);                                  // by passing parameter we will get the specific user . this .find() method will always returns 
});                                                    // the array even if the data is not found it will give the empty array .            


app.get("/readOne",async function(req,res){
    let oneUser = await userModel.findOne({name:"mno"}); // this .findOne() method will used to get the only one user if there are multiple user which having   
    res.send(oneUser);                                   // the same data then the user which is first in the list will display . if there is no user then it will 
});                                                      // not return any array and will return the null means blank page .


app.get("/delete",async function(req,res){
    let user = await userModel.findOneAndDelete({name:"mno"}); // .findOneAndDelete() will used to delete the specific data .
    res.send(user);
})

app.listen(3000);

