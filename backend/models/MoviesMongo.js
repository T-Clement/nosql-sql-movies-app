const { Db, ObjectId } = require("mongodb");

class MoviesMongo {
    /**
     * 
     * @param {Db} db 
     */
    constructor(db) {
      this.collection = db.collection('movies');
    }


    async addMovie(movie) {

      const newMovie = await this.collection.insertOne(movie);
      return newMovie;
    }







    async getMovie(movie_id) {
        // console.log(movie_id);
        const o_id = ObjectId.createFromHexString(movie_id);
        // console.log(o_id);
        // collection.update({'_id': o_id});
        const movie = await this.collection.findOne({_id: o_id});
        // console.log(movie);
        return movie;


        // users.findOne( { "email": userEmail, "password": userPassword }, function(err, results) {

        //   console.log(results); // logs "null"

        //   if(err) {
        //     console.log("error: " + err); // logs nothing
        //     res.sendStatus(403);
        //   } else {
        //     console.log("here"); // logs "here"
        //     res.sendStatus(200);
        //   }

        // });
    // }
    }


    async getMovies() {
        const movies = await this.collection.find().toArray();
        // console.log(movies);
        return movies;
    }


    // async getActorsFromMovie() {
    //     const actors = await this.collection.find().to
    // }

    

    async getDistinctGenres() {
      // const genres = await this.collection.find().toArray();
      const genres = await this.collection.distinct('genres.name');
      return genres;
    }


  }
  module.exports = MoviesMongo;