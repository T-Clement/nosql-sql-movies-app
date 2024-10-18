const express = require('express');
const router = express.Router();

const StudiosControllerNoSQL = require("../controllers/StudiosMongoController");




router.get('/', StudiosControllerNoSQL.index);

module.exports = router;
