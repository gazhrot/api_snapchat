var connection = require('../modules/mysql');
var upload = require('../modules/upload');
var express  = require('express');
var router   = express.Router();

var sendSnapCtrl = require('../controller/sendSnapCtrl');

router.post('/sendSnap', sendSnapCtrl);

module.exports = router;