var connection = require('../modules/mysql');
var express  = require('express');
var router   = express.Router();

var connectionCtrl = require('../controller/connectionCtrl');

router.post('/connection', connectionCtrl);

module.exports = router;