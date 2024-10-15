class MoviesMongo {
    constructor(db) {
      this.collection = db.collection('movies');
    }
    async addUser(movie) {
      const newMovie = await this.collection.insertOne(movie);
      return newMovie;
    }
  }
  module.exports = MoviesMongo;