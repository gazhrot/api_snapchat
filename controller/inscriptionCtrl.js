var connection = require('../modules/mysql');

var inscriptionCtrl = function(req, res) {

	if (req.body.email && req.body.password) {
		var aquery = connection.query('SELECT * FROM user WHERE email = ?', req.body.email, function (err, rows) {
			if (err) {
				console.log('fail to find users');
			} else {
				console.log(rows.length);
				if (rows.length < 1) {
					var aquery = connection.query('INSERT INTO user (email, password) VALUES (?, ?)', [req.body.email, req.body.password], function(err, rows) {
						if (err) {
							console.log(err);
						} else {
							res.send(JSON.stringify({error: true, data: [], token: ''}));
						}
					});
				} else {
					res.send(JSON.stringify({error: 'Email ou Password invalide. ou Email deja utiliser.', data: []}));
				}
			}
		});
	}
}

module.exports = inscriptionCtrl;