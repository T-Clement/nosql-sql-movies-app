const MoviesSQL = require('../models/MoviesSQL');



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





exports.store = async(req, res, next) => {
    // title, description, image_url ?, year, 

    const { title, description, year, actors, genres, studios } = req.body;

    console.log(title, description, year, actors, genres, studios );


    // {
    //     "title": "TEST",
    //     "year": "2024",
    //     "description": "This is a test description",
    //     "actors" : [],
    //     "genres": [],
    //     "studios": [] 
    // }


    // const movieToInsert = 





    return res.status(200).json({title, description, year, actors, genres, studios });



}