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





app.post("/api/mongodb/movies/store", async (req, res, next) => {

  console.log(req.body);

  const { title, description, actors, releaseDate, directors, genres, studios } = req.body;

  if (!title || !description || !releaseDate) {
    return res.status(400).json({ message: 'Title, descritption and release date are required' });
  }

  // convert ids in Object_id for MongoDB
  let actorsIds, directorsIds, studioIds;
  try {
    actorsIds = actors ? actors.map(id => ObjectId.createFromHexString(id)) : [];
    directorsIds = directors ? directors.map(id => ObjectId.createFromHexString(id)) : [];
    studioIds = studios ? studios.map(id => ObjectId.createFromHexString(id)) : [];

  } catch(error) {
    return res.status(500).json({
      message: "Ids needs to be in ObjectId format for MongoDB"
    })
  }

  // get data of actors
  let actorsData = [];
  if(actorsIds.length > 0) {
    actorsData = await mongoClient.collection('actors')
      .find({_id: { $in: actorsIds }})
      .project({ firstname: 1, lastname: 1 })
      .toArray();

    if(actorsData.length !== actorsIds.length) {
      const foundActorsIds = actorsData.map(actor => actor._id.toString());
      const missingActorsIds = actors.filter(id => !foundActorsIds.includes(id));
      return res.status(404).json({
        message: 'Some actors are not found in database',
        actorsMissing: missingActorsIds
      });
    }
  }

  // get studios data
  let studiosData = [];
  if (studioIds.length > 0) {
    studiosData = await mongoClient.collection('studios')
      .find({ _id: { $in: studioIds } })
      .project({ name: 1 })
      .toArray();

    if (studiosData.length !== studioIds.length) {
      const foundStudiosIds = studiosData.map(studio => studio._id.toString());
      const missingStudiosIds = studios.filter(id => !foundStudiosIds.includes(id));
      return res.status(404).json({
        message: 'Some studios are not found in database',
        studiosMissing: missingStudiosIds
      });
    }
  }


  // get directors data
  let directorsData = [];
  if (directorsIds.length > 0) {
    directorsData = await mongoClient.collection('directors')
      .find({ _id: { $in: directorsIds } })
      .project({ firstname: 1, lastname: 1 })
      .toArray();

    if (directorsData.length !== directorsIds.length) {
      const foundDirectorsIds = directorsData.map(director => director._id.toString());
      const missingDirectorsIds = directors.filter(id => !foundDirectorsIds.includes(id));
      return res.status(404).json({
        message: 'Some directors are not found in database',
        directorsMissing: missingDirectorsIds
      });
    }
  }

  // genres
  let genresData = [];
  if(genres && genres.length > 0) {
    genresData = genres.map(genreName => ({name: genreName}));
  }



  // create newMovie Object

  const newMovie = {
    title, 
    description,
    year: releaseDate,
    actors: actorsData,
    directors: directorsData,
    genres: genresData,
    studios: studiosData
  };



  await mongoClient.collection('movies').insertOne(newMovie);


  return res.status(201).json({
    message: 'Movie added successfully',
    movie: newMovie
  });

})


app.put("/api/mongodb/actors/:id/update", async (req, res, next) => { // put replace a complete ressource
  const {id: actorId, lastname, firstname, biographie: bio} = req.body;

  console.log(req.body);

  const query = { _id: ObjectId.createFromHexString(actorId)};
  const update= {
    $set : {
      firstname: firstname,
      lastname: lastname,
      bio: bio
    }
  };
  const options = {};

  // update actors collection for a specific actor id
  const result = await mongoClient.collection("actors").updateOne(query, update, options);





  return res.status(200).json({message: "data received :", result: result});

})



app.get('*', function(req, res){
  res.status(404).json({message: "You're lost !!"});
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});