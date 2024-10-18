const express = require('express');
const router = express.Router();

const ActorsMongoController = require("../controllers/ActorsMongoController");


router.get('/', ActorsMongoController.index);
router.get('/:id', ActorsMongoController.show);

// router.post('/store', ActorsMongoController.store);



// store pour enregistrer,
// udpate / modify
// destroy 


module.exports = router;
