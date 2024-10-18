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
                    console.error("Error finding genres : " + err.message);
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


    static async checkGenresExists(genresIds) {

        // construct placeholders
        const placeholders = genresIds.map(() => '?').join(',');

        // construct query
        const query = `SELECT * FROM genres WHERE genre_id IN (${placeholders});`;


        return new Promise((resolve, reject) => {
            db.all(query, genresIds, (err, rows) => {
                if(err) {
                    console.error('Error when in checkGenresExists method:', err.message);
                    reject(err);
                } else {

                    // extract founded genres by request
                    const foundGenresIds = rows.map(row => row.genre_id);
                    console.log("Ids found in database", foundGenresIds);
                     
                     
                     
                     // found genres not find by request
                     const missingGenresIds = genresIds.filter(id => !foundGenresIds.includes(id));
                     console.log("Ids missing in database", missingGenresIds);
                     console.log(missingGenresIds.length);


                    if(missingGenresIds.length > 0) {

                        // some genres sended in form not exists in database

                        resolve({
                            exists: false,
                            missingGenresIds: missingGenresIds
                        });

                    } else {
                        // all genres sended in form exists in database
                        resolve({exists: true});
                    }


                }
            })
        })
    }



}

module.exports = GenresSQL