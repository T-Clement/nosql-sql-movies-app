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


    const {lastname, firsname, biographie: biograhpie} = req.body;





    return res.status(200).json({message: 'data received'});
}



exports.delete = async (req, res, next) => {
    const actorId = req.params.id;

    try {

        const deleteActorResult = await ActorsSQL.deleteActor(actorId);

        if(deleteActorResult.changes === 0) {
            return res.status(404).json({message: "Actor not found or already deleted", actorId});
        }
        
        return res.status(200).json({message: "Actor and related data sucessfully deleted", details: deleteActorResult.changes});

    } catch(error) {
        console.error("Error during delete actor process: ", error.message);
        return res.status(500).json({message: 'Error during delete actor process'});
    }



}
