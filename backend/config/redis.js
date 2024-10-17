const redis = require('redis');

async function initRedis() {
  const client = redis.createClient(); // create new redis client

  client.on('error', err => {
    console.error('Redis Client Error:', err);
  });


  await client.connect()
  console.log('Connected to Redis!');


  return client; // return client to be used
}

module.exports = initRedis;
