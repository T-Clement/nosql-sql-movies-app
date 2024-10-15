const db = require('../config/sqlite');



class MoviesSQL {
    constructor (movie_id, title, title_fr = null, year, description, description_fr = null) {
        this.movie_id = movie_id;
        this.title = title;
        this.title_fr = title_fr;
        this.year = year;
        this.description = description;
        this.description_fr = description_fr;
    }



    static async getMovie (id) {



        const query = 'SELECT * FROM movies WHERE movie_id = $id';
        const values = { $id: id };

        return new Promise((resolve, reject) => {
            db.get(query, values, (err, row) => {
                if (err) {
                    console.error("Error finding movie by id: " + err.message);
                    reject(err); // reject promise if error
                    // console.log(row);
                    resolve(null); // resolve promise with row or null if no results
                } else {
                    resolve(row);
                }
            });
        });

    } 


    static async getMovies() {
        const query = 'SELECT * FROM movies;';
        const values = {};

        return new Promise((resolve, reject) => {
            db.all(query, values, (err, rows) => {
                if(err) {
                    console.error("Error finding movies : " + err.message);
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

module.exports = MoviesSQL;