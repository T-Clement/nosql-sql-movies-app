const { MongoClient } = require('mongodb');
const MoviesMongo = require('../models/MoviesMongo');

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
    
        this.Movies = new MoviesMongo(this.db);

    } catch(error) {
        console.error(error);
    }


  }
}

module.exports = new MongoBot();

