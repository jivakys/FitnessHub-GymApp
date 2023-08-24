// all redis here......
const redis = require("redis")
require("dotenv").config();

const client = redis.createClient({
    password:process.env.redis_pass,
    socket: {
        host:process.env.redis_host,
        port:process.env.redis_port
    }
});

client.connect();

client.on("error", (error) => {
  console.log(error.message);
});
client.on("connect", () => {
  console.log("Connected to the Redis Cloud DB");
});
module.exports={client}