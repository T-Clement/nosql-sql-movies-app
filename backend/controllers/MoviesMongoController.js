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




