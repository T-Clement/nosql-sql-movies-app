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

}

module.exports = ActorsSQL;