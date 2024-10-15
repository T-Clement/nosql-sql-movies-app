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


    async getMovies() {
        const movies = await this.collection.find().toArray();
        return movies;
    }


    // async getActorsFromMovie() {
    //     const actors = await this.collection.find().to
    // }

    




  }
  module.exports = MoviesMongo;