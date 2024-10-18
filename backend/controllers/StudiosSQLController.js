const StudiosSQL = require('../models/StudiosSQL');





exports.index = async (req, res, next) => {

    let studios = await StudiosSQL.getStudios();

    if (!studios) {
        return res.send(200).json([]);
    }

    return res.status(200).json(studios);
}



