const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.connect();
client.on("error", (error) => {
  console.log(error.message);
});
client.on("connect", () => {
  console.log("Connected to the Redis Cloud DB");
});
module.exports = { client };
