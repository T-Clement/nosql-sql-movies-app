const { Db, ObjectId } = require("mongodb");



class StudiosMongo {
    /**
     * 
     * @param {Db} db 
     */
    constructor(db) {
      this.collection = db.collection('studios');
    }
  
    async getStudioFromName(name) {
      return await this.collection.findOne({ name }, {_id: 1, name: 1});
    }

    async getStudios() {
        return await this.collection.find().toArray();
    }

  }
  
  module.exports = StudiosMongo;