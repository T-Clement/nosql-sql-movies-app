
const MongoBot = require('../config/mongodb');
const { ObjectId } = require("mongodb");


exports.index = async (req, res, next) => {
    let actors = await MongoBot.ActorsMongo.getActors();
    // console.log(actors);

    if (!actors) {
        return res.statut(200).json([]);
    }

    return res.status(200).json(actors);
}


exports.show = async (req, res, next) => {
    const actorId = req.params.id;
    let o_id; // for ObjectId
    try {
        o_id = ObjectId.createFromHexString(actorId)
    } catch (error) {
        return res.status(500).json({ message: "Ids needs to be in ObjectId format for MongoDB" })
    }

    let actor = await MongoBot.ActorsMongo.getActor(o_id);

    if (!actor) {
        return res.status(404).json({ message: 'No actor for this ID' });
    }

    let moviesPlayedByActor = await MongoBot.MoviesMongo.getMoviesPlayedByActor(o_id);
    console.log(moviesPlayedByActor);

    // add property to actor object
    if (moviesPlayedByActor.length === 0) {

        actor.movies = [];
    } else {

        actor.movies = moviesPlayedByActor;
    }

    return res.status(200).json(actor);
}


exports.delete = async (req, res, next) => {
    const actorId = req.params.id;

    let o_id;
    try {
        o_id = ObjectId.createFromHexString(actorId)
    } catch (error) {
        return res.status(500).json({ message: "Ids needs to be in ObjectId format for MongoDB" })
    }

    // delete in actors collection
    const result = await MongoBot.ActorsMongo.deleteActor(o_id);


    // unset field in movies collection where actorId is in field actors in movie document

    const filterPullActor = {
        "actors._id": o_id
    };

    // retrieve complete actor object
    const updatePullActor = {
        $pull: {
            actors: { _id: o_id }
        }
    }



    const resultDeleteActorInMovies = await MongoBot.db.collection('movies').updateMany(filterPullActor, updatePullActor);

    return res.status(200).json({ deleteActorInActorsCollection: result, removeActorInMoviesCollection: resultDeleteActorInMovies });


}




exports.update = async (req, res, next) => { // put replace a complete ressource
    const { id: actorId, lastname, firstname, biographie: bio } = req.body;

    // console.log(req.body);

    const query = { _id: ObjectId.createFromHexString(actorId) };
    const update = {
        $set: {
            firstname: firstname,
            lastname: lastname,
            bio: bio
        }
    };
    const options = {};

    // update actors collection for a specific actor id
    const result = await MongoBot.db.collection("actors").updateOne(query, update, options);



    // documentation links on this query : 
    // https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/#update-specific-elements-of-an-array-of-documents
    // https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--

    const filterUpdateQuery = {
        "actors._id": ObjectId.createFromHexString(actorId),
    };

    const valuesUpdateQuery = {
        $set: {
            "actors.$[elem].firstname": firstname,
            "actors.$[elem].lastname": lastname
        }
    };
    const optionsUpdateQuery = {
        arrayFilters: [{ "elem._id": ObjectId.createFromHexString(actorId) }]
    };
    const resultMutlipleUpdates = await MongoBot.db.collection("movies").updateMany(filterUpdateQuery, valuesUpdateQuery, optionsUpdateQuery);


    return res.status(200).json({ message: "data received :", actorQuery: result, moviesQuery: resultMutlipleUpdates });

}




