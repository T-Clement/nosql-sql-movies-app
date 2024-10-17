const db = require('../config/sqlite');


class ActorsSQL {
    constructor (actor_id, firstname, lastname, biographie) {
        this.actor_id = actor_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.biographie = biographie;

    }



    static async getActors() {
        const query = "SELECT * FROM actors";
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

}

module.exports = ActorsSQL;