const MongoBot = require('../config/mongodb');


exports.index = async (req, res, next) => {
    let studios = await MongoBot.StudiosMongo.getStudios();

    if (!studios) {
        return res.send(200).json([]);
    }

    return res.status(200).json(studios);
}





