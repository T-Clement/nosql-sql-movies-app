const sqlite = require('sqlite3');


let pool;


try {

} catch (error) {
    console.error("Not able to connect to database: " + error);
}



module.exports = pool;