const express = require('express');
const router = express.Router();

const ActorsMongoController = require("../controllers/ActorsMongoController");


router.get('/', ActorsMongoController.index);
router.get('/:id', ActorsMongoController.show);

// router.post('/store', ActorsMongoController.store);
router.put('/:id/update', ActorsMongoController.update);


// store pour enregistrer,
// udpate / modify
// destroy 
router.delete('/:id/delete', ActorsMongoController.delete);

module.exports = router;
