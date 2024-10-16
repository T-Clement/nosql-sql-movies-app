const express = require('express');
const router = express.Router();

const MoviesControllerSQL = require("../controllers/MoviesSQLController");


router.get('/', MoviesControllerSQL.index);
router.get('/:id', MoviesControllerSQL.show);

module.exports = router;
