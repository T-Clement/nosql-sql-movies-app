const express = require('express');
const router = express.Router();

const MoviesControllerSQL = require("../controllers/MoviesSQLController");


router.get('/', MoviesControllerSQL.index);
router.get('/:id', MoviesControllerSQL.show);

router.post('/store', MoviesControllerSQL.store);



// store pour enregistrer,
// udpate / modify
// destroy 


module.exports = router;
