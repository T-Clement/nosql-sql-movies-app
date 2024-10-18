const MongoBot = require('../config/mongodb');



exports.show = async (req, res, next) => {
    const movie = await MongoBot.MoviesMongo.getMovie(req.params.id);
    return res.status(200).json(movie);
}



exports.index = async (req, res, next) => {
    const movies = await MongoBot.MoviesMongo.getMovies();
    console.log(movies);
    return res.status(200).json(movies);
}


// exports.store = async (req, res, next) => {
//     console.log(req.body);

//     const {title, description, actors, directors, genres, studios} = req.body;

//     console.log(title, description, actors, directors, genres, studios);
//     // const newMovie = req.boby;
//     // console.log(newMovie);

//     const query = {};
//     const update = {};
//     const options = {};


//     return res.status(200).json({title, description, actors, directors, genres, studios});

// }


