var connection = require('../modules/mysql');

var uploadSnapCtrl = function(req, res) {

	res.sendFile(__dirname + '/uploads/' + req.params.snap);		
}

module.exports = uploadSnapCtrl;