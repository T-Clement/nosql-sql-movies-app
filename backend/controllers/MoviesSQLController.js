const MoviesSQL = require('../models/MoviesSQL');

const ActorsSQL = require('../models/ActorsSQL');
const GenresSQL = require('../models/GenresSQL');
const StudiosSQL = require('../models/StudiosSQL');
const { Actor } = require('../models/ActorsMongo');

const db = require('../config/sqlite');


exports.show = async (req, res, next) => {
    const movie_id = parseInt(req.params.id);

    const movie = await MoviesSQL.getMovie(movie_id);
    if (!movie) {
        return res.status(404).json({});
    }

    // get complementary data
    const actors = await MoviesSQL.getMovieActors(movie_id);

    // add actors data to movie object 
    if (!actors) {
        movie.actors = [];
    } else {
        movie.actors = actors;
    }



    const genres = await MoviesSQL.getMovieGenres(movie_id);
    // add genres to movie object
    if (!genres) {
        movie.genres = [];
    } else {
        movie.genres = genres;
    }


    const studios = await MoviesSQL.getMovieStudios(movie_id);
    // add studios to movie object
    if (!studios) {
        movie.studios = [];
    } else {
        movie.studios = studios;
    }



    return res.status(200).json(movie);
}



exports.index = async (req, res, next) => {
    let movies = await MoviesSQL.getMovies();
    // console.log("test");
    // console.log(movies);
    console.log(movies);


    if (!movies) {
        return res.send(200).json([]);
    }




    // PERMET d'ECONOMISER DES REQUETES
    // PERMET d'ECONOMISER DES REQUETES

    // optimiser en récupérant les différents acteurs pour ce film pour tous les films
    // idem pour les genres et les studios

    // ensuite boucler sur chaque tableau pour construire l'objet 


    // PERMET d'ECONOMISER DES REQUETES
    // PERMET d'ECONOMISER DES REQUETES


    let moviesWithJoins = await Promise.all(movies.map(async (movie) => {
        // console.log(movie)


        // add actors to movie object
        const actors = await MoviesSQL.getMovieActors(movie.movie_id);
        if (!actors) {
            movie.actors = [];
        } else {
            movie.actors = actors;
        }

        // add genres to movie object
        const genres = await MoviesSQL.getMovieGenres(movie.movie_id);
        if (!genres) {
            movie.genres = [];
        } else {
            movie.genres = genres;
        }


        // add studios to movie object
        const studios = await MoviesSQL.getMovieStudios(movie.movie_id);
        if (!studios) {
            movie.studios = [];
        } else {
            movie.studios = studios;
        }


        // RETURN MOVIE WITH COMPLEMENTARY DATA

        // console.log(movie);

        // movie transformer qui prend un object plus une liste de champs à afficher
        // function transform(object, fields = []) {

        // }

        // return transform(movie, ['id', 'title'])

        return movie;
    }));

    console.log(moviesWithJoins);

    return res.status(200).json(moviesWithJoins);
}





exports.store = async (req, res, next) => {
    // title, description, image_url ?, year, 

    const { title, description, releaseDate, actors, genres, studios } = req.body;

    console.log(title, description, releaseDate, actors, genres, studios);

    // required fields
    if (!title || !description || !releaseDate) {
        return res.status(400).json({ message: 'Title, description, and release date are required.' });
    }


    try {

        // array of queries executed in transaction
        let newMovieInsertionsStatements = [];


        // check if each actor sended exists
        if (actors && actors.length > 0) {

            console.log("Actors field not empty, checking exists needed");

            console.log(actors);

            const checkActorsExists = await ActorsSQL.checkActorsExists(actors);

            console.log("checkActorsExists : " + checkActorsExists)

            // return early with missing Actors id in database in JSON
            if (!checkActorsExists.exists) {
                return res.status(404).json({
                    message: "Some actors are not found in database",
                    actors: checkActorsExists.missingActorsIds
                });
            }


        }


        // check if each genre sended exists

        if (genres && genres.length > 0) {

            const checkGenresExists = await GenresSQL.checkGenresExists(genres);

            if (!checkGenresExists.exists) {
                return res.status(404).json({
                    message: "Some genres are not found in database",
                    genres: checkGenresExists.missingGenresIds
                });
            }


        }


        // check if each studio sended exists

        if (studios && studios.length > 0) {
            const checkStudiosExists = await StudiosSQL.checkStudiosExists(studios);

            if (!checkStudiosExists.exists) {
                return res.status(404).json({
                    message: "Some studios are not found in database",
                    studios: checkStudiosExists.missingGenresIds
                });
            }
        }



        // transaction to handle multiple insertions in differents databases

        await db.runAsync('BEGIN TRANSACTION;');


        // insert new movie in movie database
        const insertMovieResult = await db.runAsync(
            `INSERT INTO movies (title, description, year) VALUES (?, ?, ?)`, 
            title,
            description,
            releaseDate
        );

        // get id of inserted movie
        const movieId = insertMovieResult.lastID;


        if(actors && actors.length > 0) {
            for(const actorId of actors) {
                const actorMoviePromise = db.runAsync(
                    `INSERT INTO actors_movies (actor_id, movie_id) VALUES (?, ?);`,
                    actorId,
                    movieId
                );
                newMovieInsertionsStatements.push(actorMoviePromise);
            }
        }

        if(studios && studios.length > 0) {
            for(const studioId of studios) {
                const studioMoviePromise = db.runAsync(
                    `INSERT INTO movies_studios (studio_id, movie_id) VALUES (?, ?);`,
                    studioId,
                    movieId
                );
                newMovieInsertionsStatements.push(studioMoviePromise);
            }
        }

        if(genres && genres.length > 0) {
            for(const genreId of genres) {
                const genreMoviePromise = db.runAsync(
                    `INSERT INTO genres_movies (genre_id, movie_id) VALUES (?, ?);`,
                    genreId,
                    movieId
                );
                newMovieInsertionsStatements.push(genreMoviePromise);
            }
        }


        await Promise.all(newMovieInsertionsStatements);

        await db.runAsync('COMMIT;');


        // END TRANSACTION



        // destroy variable
        delete newMovieInsertionsStatements;


        return res.status(200).json({ 
            message: "Movie added successfully",
            movie: {
                movie_id: movieId,
                title,
                description,
                releaseDate,
                actors,
                genres,
                studios
            }
         });

    } catch (error) {

        await db.runAsync('ROLLBACK');
        console.error('Error adding a movie: ', error);
        
        return res.status(500).json({error: 'An error occured while adding the movie. Rollback.'})
    }




}