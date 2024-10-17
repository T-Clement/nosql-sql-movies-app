const db = require('../config/sqlite');


class GenresSQL {
    constructor (genre_id, name) {
        this.genre_id = genre_id;
        this.name = name;
    }



    static async getGenres() {
        const query = "SELECT * FROM genres";
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

module.exports = GenresSQL