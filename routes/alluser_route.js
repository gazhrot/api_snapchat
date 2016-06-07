var connection = require('../modules/mysql');
var express  = require('express');
var router   = express.Router();

var allUserCtrl = require('../controller/allUserCtrl');

router.post('/alluser', allUserCtrl);

module.exports = router;