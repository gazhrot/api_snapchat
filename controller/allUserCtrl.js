var connection = require('../modules/mysql');

var allUserCtrl = function(req, res) {

	if (req.body.email && req.body.token) {
		var aquery = connection.query('SELECT * FROM user WHERE email = ? AND token = ?', [req.body.email, req.body.token], function (err, rows) {
			if (err) {
				res.send(JSON.stringify({error: 'Email ou Token invalide.', data: []}));
			} else {
				if (req.body.token == rows[0].token) {
					var bquery = connection.query('SELECT * FROM user', function (err, rows) {
						if (err) {
							res.send(JSON.stringify({error: 'Aucun utilisateur.', data: []}));
						} else {

							var user = [];

							for (var i = 0; i < rows.length;i++) {
								user.push({
									id: rows[i].id,
									email: rows[i].email
								})
							}
							console.log(user);
							res.send(JSON.stringify({error: true, data: JSON.stringify(user), token: ''}));
						}
					});
				}
			}
		});
	}
}

module.exports = allUserCtrl;