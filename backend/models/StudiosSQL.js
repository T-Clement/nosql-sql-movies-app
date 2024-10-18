const db = require('../config/sqlite');


class StudiosSQL {
    constructor (studio_id, name) {
        this.studio_id = studio_id;
        this.name = name;
    }



    static async getStudios() {
        const query = "SELECT * FROM studios";
        const values = {};

        return new Promise((resolve, reject) => {
            db.all(query, values, (err, rows) => {
                if(err) {
                    console.error("Error finding studios : " + err.message);
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

module.exports = StudiosSQL