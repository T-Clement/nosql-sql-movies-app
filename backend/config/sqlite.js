const sqlite3 = require('sqlite3');

// console.log("test");
const path = require('path');
const db_name = path.join( __dirname, '../', "data", "database.sqlite");
// console.log(db_name);

// console.log("test2");

let db;


try {

    db = new sqlite3.Database(db_name, err => {
        if (err) {

          return console.error("Error in sqlite.js", err);
        }
      
        console.log("Connexion réussie à la base de données 'database.sqlite'");
      });
      


} catch (error) {
    console.error("Not able to connect to database: " + error);
}



module.exports = db;