const ActorsSQL = require('../models/ActorsSQL');




exports.index = async (req, res, next) => {
    let actors = await ActorsSQL.getActors();
    // console.log(actors);

    if (!actors) {
        return res.send(200).json([]);
    }

    return res.status(200).json(actors);
}



exports.show = async (req, res, next) => {
    let actor = await ActorsSQL.getActor(req.params.id);
    
    if(!actor) {
        return res.status(404).json({message: "No actor for this ID"});
    }

    return res.status(200).json(actor);
}


exports.update = async (req, res, next) => {
    console.log(req.body);


    return res.status(200).json({message: 'data received'});
}
