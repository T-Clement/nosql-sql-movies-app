const { ObjectId } = require('mongodb');
const MongoBot = require('../config/mongodb');



exports.show = async (req, res, next) => {
    const movie = await MongoBot.MoviesMongo.getMovie(req.params.id);
    return res.status(200).json(movie);
}



exports.index = async (req, res, next) => {
    const movies = await MongoBot.MoviesMongo.getMovies();
    // console.log(movies);
    return res.status(200).json(movies);
}


exports.store = async (req, res, next) => {

    // console.log(req.body);

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

    } catch (error) {
        return res.status(500).json({
            message: "Ids needs to be in ObjectId format for MongoDB"
        })
    }

    // get data of actors
    let actorsData = [];
    if (actorsIds.length > 0) {
        actorsData = await MongoBot.db.collection('actors')
            .find({ _id: { $in: actorsIds } })
            .project({ firstname: 1, lastname: 1 })
            .toArray();

        if (actorsData.length !== actorsIds.length) {
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
        studiosData = await MongoBot.db.collection('studios')
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
        directorsData = await MongoBot.db.collection('directors')
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
    if (genres && genres.length > 0) {
        genresData = genres.map(genreName => ({ name: genreName }));
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



    await MongoBot.db.collection('movies').insertOne(newMovie);


    return res.status(201).json({
        message: 'Movie added successfully',
        movie: newMovie
    });

}


