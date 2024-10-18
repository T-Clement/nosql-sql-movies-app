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



    static async checkStudiosExists(studiosIds) {

        // construct placeholders
        const placeholders = studiosIds.map(() => '?').join(',');

        // construct query
        const query = `SELECT * FROM studios WHERE studio_id IN (${placeholders});`;


        return new Promise((resolve, reject) => {
            db.all(query, studiosIds, (err, rows) => {
                if(err) {
                    console.error('Error when in checkStudiosExists method:', err.message);
                    reject(err);
                } else {

                    // extract founded studios by request
                    const foundStudiosIds = rows.map(row => row.studio_id);
                    console.log("Ids found in database", foundStudiosIds);
                     
                     
                     
                     // some studios not find by request
                     const missingStudiosIds = studiosIds.filter(id => !foundStudiosIds.includes(id));
                     console.log("Ids missing in database", missingStudiosIds);


                    if(missingStudiosIds.length > 0) {

                        // some studios sended in form not exists in database

                        resolve({
                            exists: false,
                            missingStudiosIds: missingStudiosIds
                        });

                    } else {
                        // all studios sended in form exists in database
                        resolve({exists: true});
                    }


                }
            })
        })
    }




}

module.exports = StudiosSQL