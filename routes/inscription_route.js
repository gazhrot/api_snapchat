var connection = require('../modules/mysql');
var express  = require('express');
var router   = express.Router();

var inscriptionCtrl = require('../controller/inscriptionCtrl');

router.post('/inscription', inscriptionCtrl);

module.exports = router;