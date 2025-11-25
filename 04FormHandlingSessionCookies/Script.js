

// How cookies && Sessions are used  :-

// -> At very first when user login at that time on session is created and a unique key is generated ,
//    at the server-side , at that time the server dont know that who is the user , so to remember the 
//    user on each request the server will join that uniue key with the users first response .

// -> This key is transfared using the cookies in the express.js .

// -> After the first request this key is only verified like in the second request of user the browser will
//    also join that unique key to the request to tell server that which user is making request when that 
//    request comes at the server the server check(verifiyes) that the unique key matches with the generated key
//    so at that time the server will not generate new key and respond to the users request . 

// -> Browser will also use the cookies to send the unique key to the server , for verification and resonse .

// -> Once the session is completed that key would be distroyed and will never used agin for new session .



// express.json() middleware use :- 

// -> It is a middleware means it will executes on each request of the user .

// -> When the json data comes from the browser to the server at that time that josn 
//    data is in string format so we cannot access or maipulate that data , so this 
//    express.json() middleware will parse the json data in javascript-onject so data 
//    can easly accessable .



// express.urlencoded() middleware use :- 

// -> It is a middleware means it will executes on each request of the user .

// -> When the form data comes from the browser to the server at that time that  
//    data is in string format but not in json , data is in url-decodeed format 
//    so we cannot access or maipulate that data , so this 
//    express.urlencoded() middleware will parse the url-decoded data in javascript-onject so data 
//    can easly accessable .

