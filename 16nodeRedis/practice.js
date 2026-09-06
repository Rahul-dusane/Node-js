import {createClient} from 'redis';

const client = createClient({
    url: "redis://127.0.0.1:6379"
});
await client.connect();

// ==========================================
// CHALLENGE 1: Temporary Login Code
// ==========================================
// Set 'login_otp' to '5544' and tell Redis to delete it after 5 seconds
await client.setEx("login_otp",5,"5544");
const remainingTime = await client.ttl("login_otp");
console.log("Remaining Time: ", remainingTime);

await new Promise(resolve => setTimeout(resolve, 6000)); // Wait for 6 seconds
const expiredValue = await client.get("login_otp");
console.log("Expired Value: ", expiredValue); // Should be null since it has expired

// ==========================================
// CHALLENGE 2: Online Store Product
// ==========================================
// Store multiple object fields under a single key 'product:99'
await client.hSet("product:99", {
    title:"gaming mouse",
    priceL: "699",
    inStock: "true"
});

const product = await client.hGetAll("product:99");
console.log(`Product: ${product.title} | Price: ${product.priceL} | In Stock: ${product.inStock}`);


await client.del("print_queue");

await client.lPush("print_queue", "document1.pdf");
await client.lPush("print_queue", "document2.pdf");
await client.lPush("print_queue", "document3.pdf");


const print1 = await client.rPop("print_queue");
console.log("Printing: ", print1);

const print2 = await client.rPop("print_queue");
console.log("Printing: ", print2);

await client.disconnect();