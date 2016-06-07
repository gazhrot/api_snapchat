var connection = require('../modules/mysql');
var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};

var connectionCtrl = function(req, res) {

	var tokens = token();

	if (req.body.email && req.body.password) {
		var aquery = connection.query('SELECT * FROM user WHERE email = ?', req.body.email, function (err, rows) {
			if (err) {
				res.send(JSON.stringify({error: 'Email ou Password invalide.', data: []}));
			} else {
				var data = {
					id: rows[0].id,
					email: rows[0].email
				}
				var bquery = connection.query('UPDATE user SET token = ? WHERE email = ?', [tokens, req.body.email], function (err, rows) {
					if (err) {
						res.send(JSON.stringify({error: 'Email invalide.', data: []}));
					} else {
						res.send(JSON.stringify({error: true, data: JSON.stringify(data), token: tokens}));
					}
				});
			}
		});
	}
}

module.exports = connectionCtrl;