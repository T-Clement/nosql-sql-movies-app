const express = require('express');

// const db = require('./config/sqlite');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


// REDIS CONNECTION
const initRedis = require('./config/redis');


// MONGO DB CONNECTION

const mongo = require('./config/mongodb');


async function start() {
  // other app startup stuff...
  const mongoClient = await mongo.init();
  const redisClient = await initRedis();

  return {
    mongoClient,
    redisClient
  }

  // other app startup stuff...
}


const cors = require('cors');

app.use(cors({
  origin: `http://127.0.0.1:5173`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // credentials: true,
}));



const moviesSqlRoutes = require('./routes/moviesSQL');
const genresSqlRoutes = require('./routes/genresSQL');
const actorsSqlRoutes = require('./routes/actorsSQL');
const studiosSqlRoutes = require('./routes/studiosSQL');
const directorsSqlRoutes = require('./routes/directorsSQL');




const moviesNoSqlRoutes = require('./routes/moviesNoSQL');
const actorsNoSqlRoutes = require('./routes/actorsNoSQL');


// ------------------------------------------------
// ROUTES FOR MOVIES
// ------------------------------------------------

// SQLITE
app.use('/api/sql/movies/', moviesSqlRoutes);
app.use('/api/sql/actors/', actorsSqlRoutes);
app.use('/api/sql/genres/', genresSqlRoutes);


// MONGODB
app.use('/api/mongodb/movies', moviesNoSqlRoutes);
app.use('/api/mongodb/actors', actorsNoSqlRoutes);


let mongoClient, redisClient
start().then(async (clients) => {
  mongoClient = clients.mongoClient
  /** @var RedisClientType redisclient */
  redisClient = clients.redisClient

})


app.get("/api/mongodb/genres", async (req, res, next) => {

  const cachedGenres = await redisClient.get("genres");
  // console.log(cachedGenres);


  if(cachedGenres) {
    console.log("Données en cache :", cachedGenres);
    return res.status(200).json(JSON.parse(cachedGenres));
  }


  // const genres = await mongo.MoviesMongo.getDistinctGenres();
  const genres = await mongoClient.collection("movies").distinct('genres.name');
  if(!genres) {
    return res.status(200).json([]); 
  } 

  // store data in redis 
  await redisClient.set("genres", JSON.stringify(genres), {
    EX: 3600 // expires after 1 hour
  });

  console.log("Genres retrieved from MongoDB and cached in Redis for futures request");

  
  return res.status(200).json(genres);
});







app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});