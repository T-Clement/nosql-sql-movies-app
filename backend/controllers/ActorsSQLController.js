const ActorsSQL = require('../models/ActorsSQL');




exports.index = async (req, res, next) => {
    let actors = await ActorsSQL.getActors();
    // console.log(actors);

    if (!actors) {
        return res.send(200).json([]);
    }

    return res.status(200).json(actors);
}



