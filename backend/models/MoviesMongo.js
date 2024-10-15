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
        // this.collection.find({
        //     // _id: new ObjectId('fghj')
        // })
      const newMovie = await this.collection.insertOne(movie);
      return newMovie;
    }


    async getMovie(movie_id) {
        const movie = await this.collection.findOne({_id: movie_id});
        return movie;
    }





    

  }
  module.exports = MoviesMongo;