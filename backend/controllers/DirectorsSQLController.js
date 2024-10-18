const DirectorsSQL = require('../models/DirectorsSQL');





exports.index = async (req, res, next) => {

    let directors = await DirectorsSQL.getDirectors();

    if (!directors) {
        return res.send(200).json([]);
    }

    return res.status(200).json(directors);
}



