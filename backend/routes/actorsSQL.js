const express = require('express');
const router = express.Router();

const ActorsControllerSQL = require("../controllers/ActorsSQLController");


router.get('/', ActorsControllerSQL.index);
// router.get('/:id', ActorsControllerSQL.show);

// router.post('/store', ActorsControllerSQL.store);



// store pour enregistrer,
// udpate / modify
// destroy 


module.exports = router;
