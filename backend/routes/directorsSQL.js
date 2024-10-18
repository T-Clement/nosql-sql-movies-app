const express = require('express');
const router = express.Router();

const DirectorsControllerSQL = require("../controllers/DirectorsSQLController");


router.get('/', DirectorsControllerSQL.index);




// store pour enregistrer,
// udpate / modify
// destroy 


module.exports = router;
