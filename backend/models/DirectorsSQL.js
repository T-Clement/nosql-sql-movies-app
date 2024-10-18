const db = require('../config/sqlite');


class DirectorsSQL {
    constructor (director_id, firstname, lastname) {
        this.director_id = director_id;
        this.firstname = firstname;
        this.lastname = lastname;
    }



    static async getDirectors() {
        const query = "SELECT * FROM directors";
        const values = {};

        return new Promise((resolve, reject) => {
            db.all(query, values, (err, rows) => {
                if(err) {
                    console.error("Error finding directors : " + err.message);
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

module.exports = DirectorsSQL