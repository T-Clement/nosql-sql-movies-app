
const MongoBot = require('../config/mongodb');


exports.index = async (req, res, next) => {
    let actors = await MongoBot.ActorsMongo.getActors();
    // console.log(actors);

    if (!actors) {
        return res.send(200).json([]);
    }

    return res.status(200).json(actors);
}





// exports.store = async(req, res, next) => {
//     // title, description, image_url ?, year, 

//     const { title, description, year, actors, genres, studios } = req.body;

//     console.log(title, description, year, actors, genres, studios );


//     // {
//     //     "title": "TEST",
//     //     "year": "2024",
//     //     "description": "This is a test description",
//     //     "actors" : [],
//     //     "genres": [],
//     //     "studios": [] 
//     // }


//     // const movieToInsert = 





//     return res.status(200).json({title, description, year, actors, genres, studios });



// }