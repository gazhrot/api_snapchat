var connection = require('../modules/mysql');
var express  = require('express');
var router   = express.Router();

var getSnapCtrl = require('../controller/getSnapCtrl');

router.post('/getSnap', getSnapCtrl);

module.exports = router;