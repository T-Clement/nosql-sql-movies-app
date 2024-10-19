const express = require('express');
const router = express.Router();

const MoviesControllerNoSQL = require("../controllers/MoviesMongoController");




router.get('/', MoviesControllerNoSQL.index);
router.get('/:id', MoviesControllerNoSQL.show);
router.post('/store', MoviesControllerNoSQL.store);

module.exports = router;
