import {createClient} from 'redis';

const client = createClient({
  url: 'redis://localhost:6379'
});
await client.connect();

// 1. SETS (Unique Collections - Duplicates are automatically ignored)
// Useful for tags, user likes, or tracking online users.
await client.del("post:101:tages");
await client.sAdd("post:101:tages", ["javascript","backend","nodejs","redis","redis"]);

const tages = await client.sMembers("post:101:tages");
console.log("Unique Tags: ", tages);


// 2. SORTED SETS (Real-Time Leaderboards)
// Every item gets a score, and Redis keeps them sorted automatically.
await client.del("game_leaderboard");
await client.zAdd("game_leaderboard", [
  { score: 1000, value: "Alice" },
  { score: 800, value: "Bob" },
  { score: 1200, value: "Charlie" }
]);

const leaderboard = await client.zRangeWithScores("game_leaderboard", 0, -1, { REV: true });
console.log("Game Leaderboard: ", leaderboard);

await client.disconnect();