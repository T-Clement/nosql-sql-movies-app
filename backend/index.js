const express = require('express');

// const db = require('./config/sqlite');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());




// MONGO DB CONNECTION

const mongo = require('./config/mongodb');

async function start() {
  // other app startup stuff...
  await mongo.init();

  

  // other app startup stuff...
}
start();

const MoviesSQL = require('./models/MoviesSQL');

// const cors = require('cors');
// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 
// }


// app.get('/', cors(corsOptions), (req, res) => {
//   res.send('Hello World!');
// });


const moviesSqlRoutes = require('./routes/moviesSQL');
const moviesNoSqlRoutes = require('./routes/moviesNoSQL');


// ROUTES FOR MOVIES
// SQLITE
app.use('/api/sql/movies/', moviesSqlRoutes);
// MONGODB
app.use('/api/mongodb/movies', moviesNoSqlRoutes);






app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});