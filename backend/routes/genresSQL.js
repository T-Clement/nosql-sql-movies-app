const express = require('express');
const router = express.Router();

const GenresControllerSQL = require("../controllers/GenresSQLController");


router.get('/', GenresControllerSQL.index);
// router.get('/:id', GenresControllerSQL.show);

router.post('/store', GenresControllerSQL.store);



// store pour enregistrer,
// udpate / modify
// destroy 


module.exports = router;
