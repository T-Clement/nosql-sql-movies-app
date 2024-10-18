
const MongoBot = require('../config/mongodb');


exports.index = async (req, res, next) => {
    let actors = await MongoBot.ActorsMongo.getActors();
    // console.log(actors);

    if (!actors) {
        return res.send(200).json([]);
    }

    return res.status(200).json(actors);
}





