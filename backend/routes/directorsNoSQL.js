const express = require('express');
const router = express.Router();

const DirectorsControllerNoSQL = require("../controllers/DirectorsMongoController");




router.get('/', DirectorsControllerNoSQL.index);

module.exports = router;
