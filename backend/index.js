const express = require('express');


const sqlite3 = require("sqlite3").verbose();
const db = require('./config/sqlite');




sqlite3.Database.prototype.runAsync = function (sql, ...params) {
    return new Promise((resolve, reject) => {
        this.run(sql, params, function (err) {
            if (err) return reject(err);
            resolve(this);
        });
    });
};


sqlite3.Database.prototype.getAsync = function (sql, ...params) {
  return new Promise((resolve, reject) => {
    this.get(sql, params, function (err, row) {
      if (err) return reject(err);
      resolve(row);
    });
  });
};


sqlite3.Database.prototype.runBatchAsync = function (statements) {
    let results = [];
    let batch = ['BEGIN', ...statements, 'COMMIT'];
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


let sql_create_genres_movies = `CREATE TABLE IF NOT EXISTS genres_movies (
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




let sql_values_actors = `INSERT INTO actors (firstname, lastname, biographie) VALUES 
('Elijah', 'Wood', 'Elijah Wood is an American actor best known for his role as Frodo Baggins in the Lord of the Rings trilogy.'),
('Ian', 'McKellen', 'Ian McKellen is an English actor known for his role as Gandalf in the Lord of the Rings and Hobbit trilogies.'),
('Viggo', 'Mortensen', 'Viggo Mortensen is an American-Danish actor, author, and musician known for his role as Aragorn in the Lord of the Rings trilogy.'),
('Orlando', 'Bloom', 'Orlando Bloom is an English actor known for his role as Legolas in the Lord of the Rings and Hobbit trilogies.'),
('Emma', 'Watson', 'Emma Watson is a British actress known for her role as Hermione Granger in the Harry Potter film series.'),
('Daniel', 'Radcliffe', 'Daniel Radcliffe is an English actor, best known for his role as Harry Potter in the Harry Potter film series.'),
('Rupert', 'Grint', 'Rupert Grint is an English actor who gained worldwide fame for his portrayal of Ron Weasley in the Harry Potter film series.'),
('Cate', 'Blanchett', 'Cate Blanchett is an Australian actress known for her role as Galadriel in the Lord of the Rings and Hobbit trilogies.'),
('Sean', 'Astin', 'Sean Astin is an American actor known for his role as Samwise Gamgee in the Lord of the Rings trilogy.'),
('Helena', 'Bonham Carter', 'Helena Bonham Carter is an English actress known for her roles in both the Harry Potter and Alice in Wonderland series.');
`;


let sql_values_directors = `INSERT INTO directors (firstname, lastname) VALUES 
('Peter', 'Jackson'),
('Chris', 'Columbus'),
('David', 'Yates'),
('Alfonso', 'Cuarón'),
('Guillermo', 'del Toro'),
('Tim', 'Burton'),
('Mike', 'Newell'),
('Andy', 'Serkis'),
('Sam', 'Raimi'),
('George', 'Lucas');
`;


let sql_values_genres = `INSERT INTO genres (name) VALUES 
('Fantasy'),
('Adventure'),
('Action'),
('Drama'),
('Family'),
('Science Fiction'),
('Mystery'),
('Thriller'),
('Comedy'),
('Animation');
`;


let sql_values_movies = `INSERT INTO movies (title, title_fr, year, description, description_fr) VALUES 
("The Lord of the Rings: The Fellowship of the Ring", "Le Seigneur des Anneaux: La Communauté de l'Anneau", "2001", "A young hobbit, Frodo, is tasked with destroying a powerful ring to prevent it from falling into the wrong hands.", "Un jeune hobbit, Frodon, doit détruire un anneau puissant pour éviter qu'il ne tombe entre de mauvaises mains."),
("The Lord of the Rings: The Two Towers", "Le Seigneur des Anneaux: Les Deux Tours", "2002", "Frodo and Sam continue their journey to Mordor while Aragorn, Legolas, and Gimli aid in the battle of Helm's Deep.", "Frodon et Sam continuent leur périple vers le Mordor tandis qu'Aragorn, Legolas et Gimli participent à la bataille du Gouffre de Helm."),
("The Lord of the Rings: The Return of the King", "Le Seigneur des Anneaux: Le Retour du Roi", "2003", "The final battle for Middle-earth begins, and Frodo reaches Mount Doom to destroy the One Ring.", "La bataille finale pour la Terre du Milieu commence, et Frodon atteint la Montagne du Destin pour détruire l'Anneau Unique."),
("Harry Potter and the Sorcerer's Stone", "Harry Potter à l'école des sorciers", "2001", "A young boy discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.", "Un jeune garçon découvre qu'il est un sorcier et entre à l'école de sorcellerie Poudlard."),
("Harry Potter and the Chamber of Secrets", "Harry Potter et la Chambre des Secrets", "2002", "Harry returns to Hogwarts for his second year and faces the opening of the Chamber of Secrets.", "Harry retourne à Poudlard pour sa deuxième année et fait face à l'ouverture de la Chambre des Secrets."),
("The Hobbit: An Unexpected Journey", "Le Hobbit: Un voyage inattendu", "2012", "Bilbo Baggins sets out on a journey with dwarves to reclaim a stolen mountain kingdom.", "Bilbon Sacquet part en voyage avec des nains pour reprendre un royaume volé dans une montagne."),
("The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", "Le Monde de Narnia: Le Lion, la Sorcière blanche et l'Armoire magique", "2005", "Four siblings discover a magical land ruled by a witch, and they team up with a lion to free it.", "Quatre frères et sœurs découvrent un monde magique dirigé par une sorcière et s'associent avec un lion pour le libérer."),
("Fantastic Beasts and Where to Find Them", "Les Animaux fantastiques", "2016", "Newt Scamander comes to New York with a suitcase full of magical creatures.", "Norbert Dragonneau arrive à New York avec une valise pleine de créatures magiques."),
("Pan's Labyrinth", "Le Labyrinthe de Pan", "2006", "In post-Civil War Spain, a young girl discovers a fantastical labyrinth.", "Dans l'Espagne post-guerre civile, une jeune fille découvre un labyrinthe fantastique."),
("Stardust", "Stardust, le mystère de l'étoile", "2007", "A young man ventures into a magical world to retrieve a fallen star for his beloved.", "Un jeune homme s'aventurera dans un monde magique pour récupérer une étoile tombée pour sa bien-aimée.");
`;




let sql_values_actors_movies = `INSERT INTO actors_movies (actor_id, movie_id) VALUES 
(1, 1), (2, 1), (3, 1), (4, 1), (1, 2), (2, 2), (3, 2), (4, 2),
(5, 4), (6, 4), (7, 4), (5, 5), (6, 5), (7, 5), (8, 6), (9, 6), (4, 7), (10, 8);
`;


let sql_values_directors_movies = `INSERT INTO directors_movies (director_id, movie_id) VALUES 
(1, 1), (1, 2), (1, 3), (2, 4), (2, 5), (4, 6), (5, 9), (6, 10), (7, 5);
`;


let sql_values_genres_movies = `INSERT INTO genres_movies (genre_id, movie_id) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10);
`;

let sql_values_movies_studios = `INSERT INTO movies_studios (movie_id, studio_id) VALUES 
(1, 1), (2, 1), (3, 1), (4, 2), (5, 2), (6, 3), (7, 5), (8, 2), (9, 6), (10, 8);
`;


let statements = [
  sql_create_actors,
  sql_create_directors,
  sql_create_genres,
  sql_create_movies,
  sql_create_studios,
  sql_create_actors_movies,
  sql_create_directors_movies,
  sql_create_genres_movies,
  sql_create_movies_studios,
];


let statements_values = [
  sql_values_actors,
  sql_values_directors,
  sql_values_genres,
  sql_values_movies,
  sql_values_actors_movies,
  sql_values_directors_movies,
  sql_values_genres_movies,
  sql_values_movies_studios
];



db.runBatchAsync(statements)
  .then(results => {
    console.log("Tables créées avec succès ou déjà présentes.")
    // console.log(results);
    return db.getAsync("SELECT COUNT(*) as count FROM actors");

  }).then(row => {
    if(row.count === 0) {
      console.log("Insertion des données car les tables sont vides");

      db.runBatchAsync(statements_values)
      .then(() => {
        console.log("Données insérées avec succès !");
      })

    } else {
      console.log("SQL : Aucune insertion nécessaire, les données existent déjà.");
    }
  })
  .catch(err => {
    console.error("BATCH FAILED: " + err);
  });


// MONGO DB CONNECTION

const mongo = require('./config/mongodb');

async function start() {
  // other app startup stuff...
  await mongo.init();
  // other app startup stuff...
}
start();


const app = express();
const port = 3000;


const MoviesSQL = require('./models/MoviesSQL');

// const cors = require('cors');
// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 
// }


// app.get('/', cors(corsOptions), (req, res) => {
//   res.send('Hello World!');
// });


app.get('/api/sql/movies/:id', async (req, res, next) => {

  const movie_id = parseInt(req.params.id);


  const movie = await MoviesSQL.getMovie(movie_id);
  if(!movie) {
    return res.status(404).json({});
  }

  // get complementary data
  const actors = await MoviesSQL.getMovieActors(movie_id);

  // add actors data to movie object 
  if(!actors) {
    movie.actors = [];
  } else {
    movie.actors = actors;
  }



  const genres = await MoviesSQL.getMovieGenres(movie_id);

  if(!genres) {
    movie.genres = [];
  } else {
    movie.genres = genres;
  }


  const studios = await MoviesSQL.getMovieStudios(movie_id);

  if(!studios) {
    movie.studios = [];
  } else {
    movie.studios = studios;
  }


  
  return res.status(200).json(movie);
});



app.get('/api/sql/movies', async (req, res, next) => {
  const movies = await MoviesSQL.getMovies();

  return res.status(200).json(movies);

});




app.get('/api/mongodb/movies', async (req, res, next) => {
  const movies = mongo.Movies.collection.find();
  console.log(movies);
  return res.status(200).json(movies);
})




app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});