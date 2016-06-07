var connection = require('../modules/mysql');

var getSnapCtrl = function(req, res) {

	if (req.body.email && req.body.token) {
		var aquery = connection.query('SELECT * FROM user WHERE email = ? AND token = ?', [req.body.email, req.body.token], function (err, rows) {
			if (err) {
				res.send(JSON.stringify({error: 'Email ou Token invalide.', data: []}));
			} else {
				if (req.body.token == rows[0].token) {
					var bquery = connection.query('SELECT * FROM snapchat INNER JOIN user WHERE snapchat.id_receiver = user.id', function (err, rows) {
						if (err) {
							res.send(JSON.stringify({error: 'Aucun Snapchat.', data: []}));
						} else {
							var snaps = []; 
							for (var i = 0; i < rows.length;i++) {
								snaps.push({
									id_snap: rows[i].id_snap,
									email_sender: rows[i].email_sender,
									id_receiver: rows[i].id_receiver,
									url: rows[i].url,
									duration: rows[i].duration,
									view: rows[i].view
								})
							}
							for (var i = 0; i < snaps.length; i++) {
								if (snaps[i].view == 0) {
									console.log(snaps[i].view);
								}
							}
							res.send(JSON.stringify({error: true, data: JSON.stringify(snaps), token: ''}));
						}
					});
				}
			}
		});
	}
}

module.exports = getSnapCtrl;