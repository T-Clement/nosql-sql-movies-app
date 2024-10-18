const MongoBot = require('../config/mongodb');


exports.index = async (req, res, next) => {
    let directors = await MongoBot.DirectorsMongo.getDirectors();
    // console.log(actors);

    if (!directors) {
        return res.send(200).json([]);
    }

    return res.status(200).json(directors);
}





