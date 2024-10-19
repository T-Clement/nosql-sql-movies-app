const db = require('../config/sqlite');


class ActorsSQL {
    constructor (actor_id, firstname, lastname, biographie) {
        this.actor_id = actor_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.biographie = biographie;

    }



    static async getActors() {
        const query = "SELECT actor_id, firstname, lastname FROM actors";
        const values = {};

        return new Promise((resolve, reject) => {
            db.all(query, values, (err, rows) => {
                if(err) {
                    console.error("Error finding actors : " + err.message);
                    reject(err);
                    // console.log(rows);
                    resolve(null);
                } else {
                    // console.log(rows);
                    resolve(rows);
                }
            });
        });

    }

    static async getActor(id) {
        const query = 'SELECT * FROM actors WHERE actor_id = $id';
        const values = { $id: id };

        return new Promise((resolve, reject) => {
            db.get(query, values, (err, row) => {
                if (err) {
                    console.error("Error finding actor by id: " + err.message);
                    reject(err); // reject promise if error
                    // console.log(row);
                    resolve(null); // resolve promise with row or null if no results
                } else {
                    resolve(row);
                }
            });
        });
    }


    static async checkActorsExists(actorsIds) {

        // construct placeholders
        const placeholders = actorsIds.map(() => '?').join(',');

        // construct query
        const query = `SELECT * FROM actors WHERE actor_id IN (${placeholders});`;


        return new Promise((resolve, reject) => {
            db.all(query, actorsIds, (err, rows) => {
                if(err) {
                    console.error('Error when in checkActorsExists :', err.message);
                    reject(err);
                } else {

                    // extract founded actors by request
                    const foundActorsIds = rows.map(row => row.actor_id);
                     console.log("Ids found in database", foundActorsIds);
                     
                     
                     
                     // found actors not find by request
                     const missingActorsIds = actorsIds.filter(id => !foundActorsIds.includes(id));
                     console.log("Ids missing in database", missingActorsIds);
                     console.log(missingActorsIds.length);


                    if(missingActorsIds.length > 0) {

                        // some actors sended in form not exists in database

                        resolve({
                            exists: false,
                            missingActorsIds: missingActorsIds
                        });

                    } else {
                        // all actors sended in form exists in database
                        resolve({exists: true});
                    }


                }
            })
        })
    }


    static async deleteActor(actorId) {
        const query = 'DELETE FROM actors WHERE actor_id = $id';
        const values = { $id: actorId };

        return new Promise((resolve, reject) => {
            db.run(query, values, function(err) { // not arrow function to get access to this and this.changes
                if (err) {
                    console.error("Error deleting actor by id: " + err.message);
                    return reject(err); // reject promise if error
                } else {
                    resolve({deletedActorId: actorId, changes: this.changes});
                }
            });
        });
    }


    static async updateActor(updatedActor) {
        const query = 'UPDATE actors SET firstname = $firstname, lastname = $lastname, biographie = $biographie WHERE actor_id = $actorId;';
        const values = {
            $actorId: updatedActor.actor_id, 
            $firstname: updatedActor.firstname, 
            $lastname: updatedActor.lastname,
            $biographie: updatedActor.biographie
        };

        return new Promise((resolve, reject) => {
            db.run(query, values, function(err) { // not arrow function to get access to this and this.changes
                if (err) {
                    console.error(`Error updating actor with actorId ${updatedActor.id} : ` + err.message);
                    return reject(err); // reject promise if error
                } else {
                    resolve({changes: this.changes});
                }
            });
        })
    }


    static async getMoviesPlayedByActor(actorId) {
        const query = 'SELECT m.movie_id, m.title, m.year FROM movies m INNER JOIN actors_movies USING(movie_id) WHERE actor_id = $actor_id';
        const values = {$actor_id: actorId};

        return new Promise((resolve, reject) => {
            db.all(query, values, (err, rows) => {
                if(err) {
                    console.error("Error finding movies of an actor : " + err.message);
                    reject(err);
                } else {
                    // console.log(rows);
                    resolve(rows);
                }
            });
        });
    }


    


}

module.exports = ActorsSQL;