import { createClient } from 'redis';

const client = createClient({
  url: 'redis://127.0.0.1:6379'
});
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

await client.set('bike:1', 'Process 134');
const value = await client.get('bike:1');
console.log(value);

// 1. HASHES (Structured Objects)
// Best for user profiles or session data where you want to store object fields.
await client.hSet("user:100",{name:"xyz",role:"admin",age:30});
const user = await client.hGetAll("user:100");
console.log("User Hash: ", user);

await client.setEx("otp:xyz@gmail.com",30,"937455");
const remaingingTime = await client.ttl("otp:xyz@gmail.com");
console.log("Remaining Time: ", remaingingTime);

await client.lPush("email_queue","welcome_email_user100");    // Put the first email into the redis queue
await client.del("email_queue");                              // delete the whole queue (this removes the first email we just added)
await client.lPush("email_queue","reset_password_user_102");  // Put a new email into the now empty redis queue
const job = await client.rPop("email_queue");                 //take out the first email from the queue and save it into a variable
console.log("Job: ", job);  

await client.disconnect();

// When you use the name localhost, a mismatch occurs between how Node resolves domain names and how Docker listens for traffic:

// localhost Resolution: Your operating system translates localhost into two addresses: ::1 (IPv6) and 127.0.0.1 (IPv4).

// Node's Default Behavior: Node.js tries to connect to the IPv6 address (::1) first.

// Docker's Setup: By default, Docker binds your Redis container's port mapping (-p 6379:6379) exclusively to IPv4 (127.0.0.1).

// The 10-Second Wait: Node attempts to open a connection to ::1:6379. Because Docker isn't listening on IPv6, the socket hangs while waiting for a response until it times out.

// The Fallback: Once IPv6 times out, Node falls back to IPv4 (127.0.0.1:6379), connects immediately, and finally executes your commands.

// By passing redis://127.0.0.1:6379, you skip DNS resolution entirely and tell Node to hit the exact IPv4 socket Docker is listening on from millisecond one.