const express = require('express');
const router = express.Router();

const StudiosControllerSQL = require("../controllers/StudiosSQLController");


router.get('/', StudiosControllerSQL.index);




// store pour enregistrer,
// udpate / modify
// destroy 


module.exports = router;
