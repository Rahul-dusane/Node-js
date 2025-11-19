console.log("Hello");

let arr = [1, 2, 3, 4, 5];


// In forEach() loop we can directly access the array Elements , 
// here the we can manipulate the actual value of the array 
// and get result , the forEach() only access the 
// array value if we make a call back function inside it ,
// the forEach() loop ignores the return statements of call back function .  
// if we assign the forEach() loop to a variable it will return undefined ,
// Ex., var result = arr.forEach(function(val){...});

arr.forEach(function(val){
    console.log(val + " Hello");
});


// In map() loop we can directly access the array Elements , 
// here the we can manipulate the actual value of the array 
// and get result , the map() only access the 
// array value if we make a call back function inside it ,
// the map() loop accepts the return statements of call back function .  
// if we assign the map() loop to a variable then we get new array 
// with manipulated value .
// the map() loop to manipulate each elements of the create the a 
// new aaray same length as of original array , then manipulate the 
// original values and put it into new aaray and that value goes to 
// map() loop assigned variable .


var newarr = arr.map(function (val){
    return val * 3;
})

console.log(newarr);


// in this map() loop we can see that we have write the if the val 
// array element is > 3 then we multiply it withe 3 then store in 
// new aaray at that time in new aaray there only 2 value got 
// difined and other 3 got undifined because in map() loop if we dont 
// return any value for that element then it will store as undefined in 
// new aaray . To do the filtering of array elements we have to use the filter() loop .
var newarr2 = arr.map(function (val){
    if(val > 3) return val * 3;
})

console.log(newarr2);

// the filter() loop is similar to map() loop but the difference is
// that in filter() loop if we dont return any value for that element 
// then it will not store anything in new aaray and the new aaray 
// length will be less than original aaray length .
// in the variable who have the filter() loop only keeps the defined 
// values so there are 0 undifined values .

var newarr3 = arr.filter(function (val){
    if(val > 3) return val * 3;
})

console.log(newarr3);



var newarr3 = arr.find(function (val){
    if(val === 3) return val;
})

console.log(newarr3);

