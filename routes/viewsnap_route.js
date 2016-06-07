var connection = require('../modules/mysql');
var express  = require('express');
var router   = express.Router();

var viewSnapCtrl = require('../controller/viewSnapCtrl');

router.post('/viewsnap', viewSnapCtrl);

module.exports = router;