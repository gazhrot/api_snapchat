var connection = require('../modules/mysql');

var viewSnapCtrl = function(req, res) {

		if (req.body.email && req.body.token && req.body.id) {
			var aquery = connection.query('SELECT * FROM snapchat WHERE id_snap = ? AND view = 0', req.body.id, function(err, rows) {
				if (err) {
					res.send(JSON.stringify({error: 'Il y a une erreur dans le token, l\'id du snap ou l\'email, ou alors le snap a deja ete vue.', data: [], token: ''}));
				} else {
					if (rows.length > 0) {
						var bquery = connection.query('UPDATE snapchat SET view = 1 WHERE id_snap = ?', req.body.id, function(err, rows) {
							if (err) {
								res.send(JSON.stringify({error: 'Le snap n\'existe pas ou a deja ete vue.', data: [], token: ''}));
							} else {
								res.send(JSON.stringify({error: true, data: [], token: ''}))
							}
						});
					} else {
						res.send(JSON.stringify({error: 'Le snap n\'existe pas ou a deja ete vue.', data: [], token: ''}));
					}
				}
			});
		}
	}

module.exports = viewSnapCtrl;