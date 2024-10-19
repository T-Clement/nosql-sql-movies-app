const { Db, ObjectId } = require("mongodb");


class Actor {
    constructor(firstname, lastname, biographie = null, id = null) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.biographie = biographie;
        this.id = null;
    }
}



class ActorsMongo {
    /**
     * 
     * @param {Db} db 
     */
    constructor(db) {
      this.collection = db.collection('actors');
    }




    


    async addActor(actor) {
        // this.collection.find({
        //     // _id: new ObjectId('fghj')
        // })
      const newActor = await this.collection.insertOne(actor);
      return newActor;
    }



    
    async getActor(actor_id) {
        const actor = await this.collection.findOne({_id: actor_id});
        return actor;
    }

    async deleteActor(actor_id) {
        return await this.collection.findOneAndDelete({_id: actor_id});
    }


    async getActors() {
        const actors = await this.collection.find({}, {projection: {firstname: 1, lastname: 1}}).toArray();
        console.log(actors);
        return actors;
    }


    async getActorFromName(firstname, lastname) {
        const actorData = await this.collection.findOne(
            { firstname: firstname, lastname: lastname },
            { projection: { _id: 1, firstname: 1, lastname: 1 } } 
        );
        if (!actorData) {
            return null;
        }
        return actorData;
    }




  }
  module.exports = {ActorsMongo, Actor};