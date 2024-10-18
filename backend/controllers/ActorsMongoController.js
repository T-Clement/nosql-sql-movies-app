
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
    } catch(error) {
        return res.status(500).json({ message: "Ids needs to be in ObjectId format for MongoDB" })
    }

    let actor = await MongoBot.ActorsMongo.getActor(o_id);

    if(!actor) {
        return res.statut(404).json({message: 'No actor for this ID'});
    }

    return res.status(200).json(actor);
}




