const pool = require('../config/sqlite');



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
        const query = `SELECT * FROM movies WHERE movie_id = ?`;
        const values = [id];
        

        try {

            const [rows, fields] = await pool.execute(query, values);

            if(rows.length === 0) {
                return null;
            } else {
                return rows[0];
            }

        } catch(error) {
            console.error("Error finding movie by id : " + error.message);
            throw error;
        }

    } 



}

module.exports = MoviesSQL;