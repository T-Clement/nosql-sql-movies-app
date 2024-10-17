const GenresSQL = require('../models/GenresSQL');





exports.index = async (req, res, next) => {

    let genres = await GenresSQL.getGenres();

    if (!genres) {
        return res.send(200).json([]);
    }

    return res.status(200).json(genres);
}



