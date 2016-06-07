var connection = require('../modules/mysql');
var express  = require('express');
var router   = express.Router();

var uploadSnapCtrl = require('../controller/uploadSnapCtrl');

router.get('/:snap', uploadSnapCtrl);

module.exports = router;