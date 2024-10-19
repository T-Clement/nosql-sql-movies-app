const express = require('express');

const { Db, ObjectId } = require("mongodb");

// const db = require('./config/sqlite');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
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


let mongoClient, redisClient;

// assign database clients connection to variables
start().then(async (clients) => {
  /** @var Mongo */
  mongoClient = clients.mongoClient

  /** @var RedisClientType redisclient */
  redisClient = clients.redisClient

});







const cors = require('cors');

app.use(cors({
  origin: `http://127.0.0.1:5173`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // credentials: true,
}));

// ------------------------------------------------
// ROUTES
// ------------------------------------------------

// ------------------------------------------------
// ROUTES SQL
// ------------------------------------------------

const moviesSqlRoutes = require('./routes/moviesSQL');
const genresSqlRoutes = require('./routes/genresSQL');
const actorsSqlRoutes = require('./routes/actorsSQL');
const studiosSqlRoutes = require('./routes/studiosSQL');
const directorsSqlRoutes = require('./routes/directorsSQL');



// ------------------------------------------------
// ROUTES NOSQL
// ------------------------------------------------

const moviesNoSqlRoutes = require('./routes/moviesNoSQL');
const actorsNoSqlRoutes = require('./routes/actorsNoSQL');
const directorsNoSqlRoutes = require('./routes/directorsNoSQL');
const studiosNoSqlRoutes = require('./routes/studiosNoSQL');




// ------------------------------------------------
// ------------------------------------------------

// SQLITE
app.use('/api/sql/movies/', moviesSqlRoutes);
app.use('/api/sql/actors/', actorsSqlRoutes);
app.use('/api/sql/genres/', genresSqlRoutes);
app.use('/api/sql/studios/', studiosSqlRoutes);
app.use('/api/sql/directors/', directorsSqlRoutes);

// MONGODB
app.use('/api/mongodb/movies', moviesNoSqlRoutes);
app.use('/api/mongodb/actors', actorsNoSqlRoutes);
app.use('/api/mongodb/directors', directorsNoSqlRoutes);
app.use('/api/mongodb/studios', studiosNoSqlRoutes);






// GENRES FOR MONGODB
app.get("/api/mongodb/genres", async (req, res, next) => {

  const cachedGenres = await redisClient.get("genres");

  if (cachedGenres) {
    console.log("Données en cache :", cachedGenres);
    return res.status(200).json(JSON.parse(cachedGenres));
  }


  // const genres = await mongo.MoviesMongo.getDistinctGenres();
  const genres = await mongoClient.collection("movies").distinct('genres.name');
  if (!genres) {
    return res.status(200).json([]);
  }

  // store data in redis 
  await redisClient.set("genres", JSON.stringify(genres), {
    EX: 3600 // expires after 1 hour
  });

  console.log("Genres retrieved from MongoDB and cached in Redis for futures request");


  return res.status(200).json(genres);
});




// app.put("/api/mongodb/actors/:id/update", async (req, res, next) => { // put replace a complete ressource
//   const { id: actorId, lastname, firstname, biographie: bio } = req.body;

//   // console.log(req.body);

//   const query = { _id: ObjectId.createFromHexString(actorId) };
//   const update = {
//     $set: {
//       firstname: firstname,
//       lastname: lastname,
//       bio: bio
//     }
//   };
//   const options = {};

//   // update actors collection for a specific actor id
//   const result = await mongoClient.collection("actors").updateOne(query, update, options);



//   // documentation links on this query : 
//   // https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/#update-specific-elements-of-an-array-of-documents
//   // https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--

//   const filterUpdateQuery = {
//     "actors._id": ObjectId.createFromHexString(actorId), 
//   };

//   const valuesUpdateQuery = {
//     $set : { 
//       "actors.$[elem].firstname": firstname,
//       "actors.$[elem].lastname": lastname 
//     }
//   };
//   const optionsUpdateQuery = {
//     arrayFilters: [{"elem._id" :  ObjectId.createFromHexString(actorId)}]
//   };
//   const resultMutlipleUpdates = await mongoClient.collection("movies").updateMany(filterUpdateQuery, valuesUpdateQuery, optionsUpdateQuery);


//   return res.status(200).json({ message: "data received :", actorQuery: result, moviesQuery: resultMutlipleUpdates});

// })



app.get('*', function (req, res) {
  res.status(404).json({ message: "You're lost !!" });
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});