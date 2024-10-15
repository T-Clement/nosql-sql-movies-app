  const express = require('express');
  const path = require('path');

  const sqlite3 = require("sqlite3").verbose();

  const db_name = path.join(__dirname, "data", "database.sqlite");

  
  const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return console.error(err.message);
    }

    


    console.log("Connexion réussie à la base de données 'database.sqlite'");
  });







  sqlite3.Database.prototype.runAsync = function (sql, ...params) {
      return new Promise((resolve, reject) => {
          this.run(sql, params, function (err) {
              if (err) return reject(err);
              resolve(this);
          });
      });
  };

  sqlite3.Database.prototype.runBatchAsync = function (statements) {
      var results = [];
      var batch = ['BEGIN', ...statements, 'COMMIT'];
      return batch.reduce((chain, statement) => chain.then(result => {
          results.push(result);
          return db.runAsync(...[].concat(statement));
      }), Promise.resolve())
      .catch(err => db.runAsync('ROLLBACK').then(() => Promise.reject(err +
          ' in statement #' + results.length)))
      .then(() => results.slice(2));
  };





  let sql_create_actors = `CREATE TABLE IF NOT EXISTS actors (
    actor_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    biographie TEXT
  );`;


  let sql_create_movies = `CREATE TABLE IF NOT EXISTS movies (
    movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    title_fr VARCHAR(200),
    year DATETIME NOT NULL,
    description TEXT NOT NULL,
    description_fr TEXT
  );`;


  let sql_create_studios = `CREATE TABLE IF NOT EXISTS studios (
    studio_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(200) NOT NULL
  );`;


  let sql_create_directors = `CREATE TABLE IF NOT EXISTS directors (
    director_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL
  );`;


  let sql_create_genres = `CREATE TABLE IF NOT EXISTS genres (
    genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL
  );`;



  let sql_create_actors_movies = `CREATE TABLE IF NOT EXISTS actors_movies (
    actor_id INTEGER,
    movie_id INTEGER,
    FOREIGN KEY(actor_id) REFERENCES actors(actor_id),
    FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
  );`;


let sql_create_directors_movies = `CREATE TABLE IF NOT EXISTS directors_movies (
  director_id INTEGER,
  movie_id INTEGER,
  FOREIGN KEY(director_id) REFERENCES directors(director_id),
  FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
);`;


let sql_create_genre_movies = `CREATE TABLE IF NOT EXISTS genres_movies (
  genre_id INTEGER,
  movie_id INTEGER,
  FOREIGN KEY(genre_id) REFERENCES genres(genre_id),
  FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
);`;


let sql_create_movies_studios = `CREATE TABLE IF NOT EXISTS movies_studios (
  movie_id INTEGER,
  studio_id INTEGER,
  FOREIGN KEY(movie_id) REFERENCES movies(movie_id),
  FOREIGN KEY(studio_id) REFERENCES studios(studio_id)
);`;





  let statements = [
    sql_create_actors,
    sql_create_directors,
    sql_create_genres,
    sql_create_movies,
    sql_create_studios,
    sql_create_actors_movies,
    sql_create_directors_movies,
    sql_create_genre_movies,
    sql_create_movies_studios
  ];

  db.runBatchAsync(statements).then(results => {
    console.log("SUCCESS!")
    console.log(results);
  }).catch(err => {
    console.error("BATCH FAILED: " + err);
  });






  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    res.send('Hello World!');
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })