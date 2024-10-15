const { MongoClient } = require('mongodb');
const MoviesMongo = require('../models/MoviesMongo');
const {ActorsMongo, Actor} = require('../models/ActorsMongo');
const {DirectorsMongo, Director} = require('../models/DirectorsMongo');

class MongoBot {
  constructor() {
    const url = 'mongodb://localhost:27017/';

    // this.client = new MongoClient(url, conf.opts);
    this.client = new MongoClient(url);
  }
  async init() {
    try {
        await this.client.connect();
        console.log('MongoDB connected');
    
        this.db = this.client.db('netfluuux');
    

        this.ActorsMongo = new ActorsMongo(this.db);
        this.DirectorsMongo = new DirectorsMongo(this.db);


        let actorsCollection = this.db.collection("actors");

        // console.log(await actorsCollection.countDocuments());

        // import actors
        if(await actorsCollection.countDocuments() === 0) {
            
          
            // AJOUTER LES GENRES EN CACHE ET PAS BESOIN D'EN FAIRE UNE COLLECTION

            

            // add actors data
            let actors = await this.db.collection("actors").insertMany([
                {
                    firstname: 'Elijah',
                    lastname: 'Wood',
                    bio: 'Elijah Wood is an American actor best known for his role as Frodo Baggins in the Lord of the Rings trilogy.'
                  },
                  {
                    firstname: 'Ian',
                    lastname: 'McKellen',
                    bio: 'Ian McKellen is an English actor known for his role as Gandalf in the Lord of the Rings and Hobbit trilogies.'
                  },
                  {
                    firstname: 'Viggo',
                    lastname: 'Mortensen',
                    bio: 'Viggo Mortensen is an American-Danish actor, author, and musician known for his role as Aragorn in the Lord of the Rings trilogy.'
                  },
                  {
                    firstname: 'Orlando',
                    lastname: 'Bloom',
                    bio: 'Orlando Bloom is an English actor known for his role as Legolas in the Lord of the Rings and Hobbit trilogies.'
                  },
                  {
                    firstname: 'Emma',
                    lastname: 'Watson',
                    bio: 'Emma Watson is a British actress known for her role as Hermione Granger in the Harry Potter film series.'
                  },
                  {
                    firstname: 'Daniel',
                    lastname: 'Radcliffe',
                    bio: 'Daniel Radcliffe is an English actor, best known for his role as Harry Potter in the Harry Potter film series.'
                  },
                  {
                    firstname: 'Rupert',
                    lastname: 'Grint',
                    bio: 'Rupert Grint is an English actor who gained worldwide fame for his portrayal of Ron Weasley in the Harry Potter film series.'
                  },
                  {
                    firstname: 'Cate',
                    lastname: 'Blanchett',
                    bio: 'Cate Blanchett is an Australian actress known for her role as Galadriel in the Lord of the Rings and Hobbit trilogies.'
                  },
                  {
                    firstname: 'Sean',
                    lastname: 'Astin',
                    bio: 'Sean Astin is an American actor known for his role as Samwise Gamgee in the Lord of the Rings trilogy.'
                  },
                  {
                    firstname: 'Helena',
                    lastname: 'Bonham Carter',
                    bio: 'Helena Bonham Carter is an English actress known for her roles in both the Harry Potter and Alice in Wonderland series.'
                  }
            ]);


            // console.log(actors);


            // add directors data 
            let directors = await this.db.collection("directors").insertMany([
                {
                    firstname: 'Peter',
                    lastname: "Jackson"
                },
                {
                    firstname: 'Chris',
                    lastname: "Columbus"
                },
                {
                    firstname: 'David',
                    lastname: "Yates"
                },
                {
                    firstname: 'Alfonso',
                    lastname: "Cuarón"
                },
                {
                    firstname: 'Guillermo',
                    lastname: "del Toro"
                },
                {
                    firstname: 'Tim',
                    lastname: "Burton"
                },
                {
                    firstname: 'Mike',
                    lastname: "Newell"
                },
                {
                    firstname: 'Andy',
                    lastname: "Serkis"
                },
                {
                    firstname: 'Sam',
                    lastname: "Raimi"
                },
                {
                    firstname: 'George',
                    lastname: "Lucas"
                }

            ]);



            let movies = await this.db.collection("movies").insertMany([
                
                    {
                    //   "movie_id": await this.,
                      "title": "The Lord of the Rings: The Fellowship of the Ring",
                      "title_fr": "Le Seigneur des Anneaux: La Communauté de l'Anneau",
                      "year": "2001",
                      "description": "A young hobbit, Frodo, is tasked with destroying a powerful ring to prevent it from falling into the wrong hands.",
                      "description_fr": "Un jeune hobbit, Frodon, doit détruire un anneau puissant pour éviter qu'il ne tombe entre de mauvaises mains.",
                      "actors": [
                        await this.ActorsMongo.getActorFromName("Elijah", "Wood"),
                        await this.ActorsMongo.getActorFromName("Ian", "McKellen"),
                        await this.ActorsMongo.getActorFromName("Viggo", "Mortensen"),
                        await this.ActorsMongo.getActorFromName("Orlando", "Bloom"),
                      ],
                      "directors": [
                            await this.DirectorsMongo.getDirectorFromName('Peter', 'Jackson')
                        ],
                      "genres": [
                        {
                          "genre_id": 1,
                          "name": "Fantasy"
                        },
                        {
                          "genre_id": 2,
                          "name": "Adventure"
                        }
                      ],
                      "studio": {
                        "studio_id": 1,
                        "name": "New Line Cinema"
                      }
                    },
                    {
                      "movie_id": 2,
                      "title": "The Lord of the Rings: The Two Towers",
                      "title_fr": "Le Seigneur des Anneaux: Les Deux Tours",
                      "year": "2002",
                      "description": "Frodo and Sam continue their journey to Mordor while Aragorn, Legolas, and Gimli aid in the battle of Helm's Deep.",
                      "description_fr": "Frodon et Sam continuent leur périple vers le Mordor tandis qu'Aragorn, Legolas et Gimli participent à la bataille du Gouffre de Helm.",
                      "actors": [
                        await this.ActorsMongo.getActorFromName("Elijah", "Wood"),
                        await this.ActorsMongo.getActorFromName("Ian", "McKellen"),
                        await this.ActorsMongo.getActorFromName("Viggo", "Mortensen"),
                        await this.ActorsMongo.getActorFromName("Orlando", "Bloom"),
                        
                      ],
                      "director": [
                        await this.DirectorsMongo.getDirectorFromName('Peter', 'Jackson')

                      ],
                      "genres": [
                        {
                          "genre_id": 1,
                          "name": "Fantasy"
                        },
                        {
                          "genre_id": 2,
                          "name": "Adventure"
                        }
                      ],
                      "studio": {
                        "studio_id": 1,
                        "name": "New Line Cinema"
                      }
                    },
                    {
                      "movie_id": 3,
                      "title": "The Lord of the Rings: The Return of the King",
                      "title_fr": "Le Seigneur des Anneaux: Le Retour du Roi",
                      "year": "2003",
                      "description": "The final battle for Middle-earth begins, and Frodo reaches Mount Doom to destroy the One Ring.",
                      "description_fr": "La bataille finale pour la Terre du Milieu commence, et Frodon atteint la Montagne du Destin pour détruire l'Anneau Unique.",
                      "actors": [
                        await this.ActorsMongo.getActorFromName("Elijah", "Wood"),
                        await this.ActorsMongo.getActorFromName("Ian", "McKellen"),
                        await this.ActorsMongo.getActorFromName("Viggo", "Mortensen"),
                        await this.ActorsMongo.getActorFromName("Orlando", "Bloom"),
                      ],
                      "director": [
                        await this.DirectorsMongo.getDirectorFromName('Peter', 'Jackson')

                      ],
                      "genres": [
                        {
                          "genre_id": 1,
                          "name": "Fantasy"
                        },
                        {
                          "genre_id": 2,
                          "name": "Adventure"
                        }
                      ],
                      "studio": {
                        "studio_id": 1,
                        "name": "New Line Cinema"
                      }
                    },
                    {
                      "movie_id": 4,
                      "title": "Harry Potter and the Sorcerer's Stone",
                      "title_fr": "Harry Potter à l'école des sorciers",
                      "year": "2001",
                      "description": "A young boy discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.",
                      "description_fr": "Un jeune garçon découvre qu'il est un sorcier et entre à l'école de sorcellerie Poudlard.",
                      "actors": [
                        await this.ActorsMongo.getActorFromName("Emma", "Watson"),
                        await this.ActorsMongo.getActorFromName("Daniel", "Radcliffe"),
                        await this.ActorsMongo.getActorFromName("Rupert", "Grint"),
                      ],
                      "director": [
                        await this.DirectorsMongo.getDirectorFromName("Chris", "Columbus")
                      ],
                      "genres": [
                        {
                          "genre_id": 1,
                          "name": "Fantasy"
                        },
                        {
                          "genre_id": 2,
                          "name": "Adventure"
                        }
                      ],
                      "studio": {
                        "studio_id": 2,
                        "name": "Warner Bros."
                      }
                    },
                    {
                      "movie_id": 5,
                      "title": "Harry Potter and the Chamber of Secrets",
                      "title_fr": "Harry Potter et la Chambre des Secrets",
                      "year": "2002",
                      "description": "Harry returns to Hogwarts for his second year and faces the opening of the Chamber of Secrets.",
                      "description_fr": "Harry retourne à Poudlard pour sa deuxième année et fait face à l'ouverture de la Chambre des Secrets.",
                      "actors": [
                        await this.ActorsMongo.getActorFromName("Emma", "Watson"),
                        await this.ActorsMongo.getActorFromName("Daniel", "Radcliffe"),
                        await this.ActorsMongo.getActorFromName("Rupert", "Grint"),
                      ],
                      "director": [
                        await this.DirectorsMongo.getDirectorFromName("Chris", "Columbus")
                      ],
                      "genres": [
                        {
                          "genre_id": 1,
                          "name": "Fantasy"
                        },
                        {
                          "genre_id": 2,
                          "name": "Adventure"
                        }
                      ],
                      "studio": {
                        "studio_id": 2,
                        "name": "Warner Bros."
                      }
                    },
                    {
                      "movie_id": 6,
                      "title": "The Hobbit: An Unexpected Journey",
                      "title_fr": "Le Hobbit: Un voyage inattendu",
                      "year": "2012",
                      "description": "Bilbo Baggins sets out on a journey with dwarves to reclaim a stolen mountain kingdom.",
                      "description_fr": "Bilbon Sacquet part en voyage avec des nains pour reprendre un royaume volé dans une montagne.",
                      "actors": [
                        await this.ActorsMongo.getActorFromName("Cate", "Blanchett"),
                        await this.ActorsMongo.getActorFromName("Sean", "Astin"),
                       
                      ],
                      "director": [
                        [
                            await this.DirectorsMongo.getDirectorFromName("Alfonso", "Cuarón")
                          ]
                      ],
                      "genres": [
                        {
                          "genre_id": 1,
                          "name": "Fantasy"
                        }
                      ],
                      "studio": {
                        "studio_id": 3,
                        "name": "MGM"
                      }
                    },
                    {
                      "movie_id": 7,
                      "title": "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
                      "title_fr": "Le Monde de Narnia: Le Lion, la Sorcière blanche et l'Armoire magique",
                      "year": "2005",
                      "description": "Four siblings discover a magical land ruled by a witch, and they team up with a lion to free it.",
                      "description_fr": "Quatre frères et sœurs découvrent un monde magique dirigé par une sorcière et s'associent avec un lion pour le libérer.",
                      "actors": [
                        await this.ActorsMongo.getActorFromName("Orlando", "Bloom"),
                      ],
                      "director": [
                        await this.DirectorsMongo.getDirectorFromName("Mike", "Newell"),
                      ],
                      "genres": [
                        {
                          "genre_id": 1,
                          "name": "Fantasy"
                        }
                      ],
                      "studio": {
                        "studio_id": 5,
                        "name": "Walt Disney Pictures"
                      }
                    },
                    {
                      "movie_id": 8,
                      "title": "Fantastic Beasts and Where to Find Them",
                      "title_fr": "Les Animaux fantastiques",
                      "year": "2016",
                      "description": "Newt Scamander comes to New York with a suitcase full of magical creatures.",
                      "description_fr": "Norbert Dragonneau arrive à New York avec une valise pleine de créatures magiques.",
                      "actors": [
                        await this.ActorsMongo.getActorFromName("Helena", "Bonham Carter"),
                       
                      ],
                      "director": [
                        await this.DirectorsMongo.getDirectorFromName("Andy", "Serkis"),
                      ],
                      "genres": [
                        {
                          "genre_id": 1,
                          "name": "Fantasy"
                        }
                      ],
                      "studio": {
                        "studio_id": 2,
                        "name": "Warner Bros."
                      }
                    },
                    {
                      "movie_id": 9,
                      "title": "Pan's Labyrinth",
                      "title_fr": "Le Labyrinthe de Pan",
                      "year": "2006",
                      "description": "In post-Civil War Spain, a young girl discovers a fantastical labyrinth.",
                      "description_fr": "Dans l'Espagne post-guerre civile, une jeune fille découvre un labyrinthe fantastique.",
                      "actors": [],
                      "director": [
                        await this.DirectorsMongo.getDirectorFromName("Guillermo", "del Toro"),

                      ],
                      "genres": [
                        {
                          "genre_id": 1,
                          "name": "Fantasy"
                        }
                      ],
                      "studio": {
                        "studio_id": 6,
                        "name": "Picturehouse"
                      }
                    },
                    {
                      "movie_id": 10,
                      "title": "Stardust",
                      "title_fr": "Stardust, le mystère de l'étoile",
                      "year": "2007",
                      "description": "A young man ventures into a magical world to retrieve a fallen star for his beloved.",
                      "description_fr": "Un jeune homme s'aventurera dans un monde magique pour récupérer une étoile tombée pour sa bien-aimée.",
                      "actors": [],
                      "director": [
                        await this.DirectorsMongo.getDirectorFromName("Andy", "Serkis"),
                      ],  
                      "genres": [
                        {
                          "genre_id": 1,
                          "name": "Fantasy"
                        }
                      ],
                      "studio": {
                        "studio_id": 8,
                        "name": "Paramount Pictures"
                      }
                    }
                  
                  
            ])







        }


        // add Movie



        // initialize class to interact with collections
        this.Movies = new MoviesMongo(this.db);
        this.Actors = new ActorsMongo(this.db);

    } catch(error) {
        console.error(error);
    }


  }
}

module.exports = new MongoBot();

