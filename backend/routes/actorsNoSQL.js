const express = require('express');
const router = express.Router();

const ActorsMongoController = require("../controllers/ActorsMongoController");


router.get('/', ActorsMongoController.index);
// router.get('/:id', ActorsControllerSQL.show);

// router.post('/store', ActorsControllerSQL.store);



// store pour enregistrer,
// udpate / modify
// destroy 


module.exports = router;
