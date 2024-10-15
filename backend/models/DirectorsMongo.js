const { Db, ObjectId } = require("mongodb");


class Director {
    constructor(firstname, lastname, id = null) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.id = null;
    }
}



class DirectorsMongo {
    /**
     * 
     * @param {Db} db 
     */
    constructor(db) {
      this.collection = db.collection('directors');
    }




    


    async addDirector(director) {
        // this.collection.find({
        //     // _id: new ObjectId('fghj')
        // })
      const newDirector = await this.collection.insertOne(director);
      return newDirector;
    }



    
    async getDirector(director_id) {
        const actor = await this.collection.findOne({_id: actor_id});
        return actor;
    }


    async getDirectors() {
        const directors = await this.collection.find().toArray();
        return directors;
    }


    async getDirectorFromName(firstname, lastname) {
        const directorData = await this.collection.findOne(
            { firstname: firstname, lastname: lastname },
            { projection: { _id: 1, firstname: 1, lastname: 1 } } 
        );
        console.log(directorData);
        if (!directorData) {
            return null;
        }
        return directorData;
    }




  }
  module.exports = {DirectorsMongo, Director};