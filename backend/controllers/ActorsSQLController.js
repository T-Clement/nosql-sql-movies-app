const ActorsSQL = require('../models/ActorsSQL');



// exports.show = async (req, res, next) => {
//     const movie_id = parseInt(req.params.id);

//     const movie = await MoviesSQL.getMovie(movie_id);
//     if (!movie) {
//         return res.status(404).json({});
//     }

//     // get complementary data
//     const actors = await MoviesSQL.getMovieActors(movie_id);

//     // add actors data to movie object 
//     if (!actors) {
//         movie.actors = [];
//     } else {
//         movie.actors = actors;
//     }



//     const genres = await MoviesSQL.getMovieGenres(movie_id);
//     // add genres to movie object
//     if (!genres) {
//         movie.genres = [];
//     } else {
//         movie.genres = genres;
//     }


//     const studios = await MoviesSQL.getMovieStudios(movie_id);
//     // add studios to movie object
//     if (!studios) {
//         movie.studios = [];
//     } else {
//         movie.studios = studios;
//     }



//     return res.status(200).json(movie);
// }



exports.index = async (req, res, next) => {
    let actors = await ActorsSQL.getActors();
    // console.log(actors);

    if (!actors) {
        return res.send(200).json([]);
    }

    return res.status(200).json(actors);
}





// exports.store = async(req, res, next) => {
//     // title, description, image_url ?, year, 

//     const { title, description, year, actors, genres, studios } = req.body;

//     console.log(title, description, year, actors, genres, studios );


//     // {
//     //     "title": "TEST",
//     //     "year": "2024",
//     //     "description": "This is a test description",
//     //     "actors" : [],
//     //     "genres": [],
//     //     "studios": [] 
//     // }


//     // const movieToInsert = 





//     return res.status(200).json({title, description, year, actors, genres, studios });



// }