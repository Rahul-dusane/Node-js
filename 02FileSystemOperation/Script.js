//here ,very first we create the package.json using the npm init command .
//In this video we are going to talk about file Systems module .
//Today we will see the call-back API of the file system .
//which includes : writeFile
//................ readFile
//................ appendFile
//................ copyFile
//................ rename
//................ unlink File


const fs = require('fs');

//readFile API = This API will used to read the content of the file 
//               if file dose not exists then it will throw error.

// fs.readFile("./data.txt",function (err,data){
//     if(err) console.log(err);                   //here, the (data)Argument is the content of the file ,   
//     else console.log("Content : ",data);        //it will return raw buffer(non human readable form ) .
// })


// fs.readFile("./package.json",{encoding: 'utf-8'},function (err,data){
//     if(err) console.log(err);                //here the encoding option will specifies that in which
//     else console.log("Content : ",data);     //type data need to display , here we get into string formate .
// })


//writeFile API :- This API will used to create the new file if it not exists 
//                 and write content in file , existsing content will override . 

// fs.writeFile("First.txt","Hello , How Are You ?",function(err){
//     if(err) console.error(err);
//     else console.log("done");
// });


//appendFile API :- This API will used to create the new file if it not exists 
//                 and write content in end of file , existsing content will not 

// fs.appendFile("Basic.txt"," I Am Grate .",function(err){
//     if(err) console.error(err);
//     else console.log("done");
// });


//rename API :- This API will used to rename the exists file
//              if the renamed file (new file named) exists 
//              then it will throw the error .

// fs.rename("First.txt","Basic.txt",function (err){
//     if(err) console.error(err);
//     else console.log("done");
// })


//copyFile API :- This API will used to create the new file if it not exists  
//                if File exists then it will copy the content of the sourceFile in 
//                destinationFile .

// fs.copyFile("Basic.txt","./Copy/New.txt",function (err){
//     if(err)console.error(err);
//     else console.log("done");
// })


//unlink API :- This API will used to delete existsing file ,
//              this API will not remove the folder .

// fs.unlink("First.txt",function (err){
//     if(err) console.error(erro);
//     else console.log("File Deleted..");
// })

//mkdir API :- This API will used to create the folder , 
//             if the parent folder dose not exists then 
//             it will give error .

// fs.mkdir("../FileSystemOperation/TempFolder/TempFolder2",function (err){
//     if(err) console.error(err);
//     else console.log("Folder Created..");
// })

// fs.mkdir("../FileSystemOperation/TempFolder/TempFolder2",{recursive: true},function (err){
//     if(err) console.error(err);             //By using this recursive (option) it , it self 
//     else console.log("Folder Created..");   // create the parent folder if they never exists .
// })


//readdir API :- This API will used to read the folder , 
//             if the give folder dose not exists then 
//             it will give error , it will list details 
//             as array.

// fs.readdir("../FileSystemOperation",function (err,file){
//     if(err) console.error(err);
//     else console.log("Folder Created..");
    
//     try{
//         for(const data of file ){                    
//             console.log(data);
//         }
//     }catch(err){
//         console.log("Error : ",err);    
//     }

// });



// fs.readdir("../FileSystemOperation",{recursive : true},function (err,file){
//     if(err) console.error(err);
//     else console.log("Folder Created..");
    
//     try{
//         for(const data of file ){             //By using the recursive option we can also   
//             console.log(data);                //read the sub-directory and sub-files .
//         }
//     }catch(err){
//         console.log("Error : ",err);    
//     }

// });

// fs.mkdir("../FileSystemOperation/TempFolder/TempFolder2",{recursive: ture},function (err){
//     if(err) console.error(err);             //By using this recursive (option) it , it self 
//     else console.log("Folder Created..");   // create the parent folder if they never exists .
// })


//rmdir API :- This API will used to delete existsing folder .

// fs.rmdir("./Copy",function (err){       //This portion will give error cause in 
//     if(err) console.error(err);         //that folder there is a file and we have 
//     console.log("Folder Reomved..");    //not used the options in perameter(recursive).
// })

 
// fs.rmdir("./Copy",{recursive:true},function (err){     //This portion will give show waring that the (recursive)  
//     if(err) console.error(err);                        //options are removed from node but it the funcion work  
//     console.log("Folder Reomved..");                   //as intended .
// })

// const http = require('http');

// const server = http.createServer(function(req,res){
//     res.end("hello world");
// })

// server.listen(3000);
