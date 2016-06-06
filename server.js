var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'api_snapchat'
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function (req, res, next) {
    // autorise quelle site a envoyer des donné (ici tout le monde)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // quelle type de requete sont autoriser
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // OBLIGER SINON PAS DE RECEPTION DE DATA !!
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pour l'API
    res.setHeader('Access-Control-Allow-Credentials', true);
    //Pour continuer dnas les autres function
    next();
});


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};

var upload = multer({ storage : storage}).single('userPhoto');

app.post('/option=inscription', function(req, res) {

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
});

app.post('/option=connexion', function(req, res) {

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
        res.send(JSON.stringify({error: true, data: JSON.stringify(data), token: tokens}));
      }
    });
  }
});

app.post('/option=alluser', function(req, res) {

  if (req.body.email && req.body.password) {
    var aquery = connection.query('SELECT * FROM user WHERE email = ?', req.body.email, function (err, rows) {
      if (err) {
        res.send(JSON.stringify({error: 'Email ou Password invalide.', data: []}));
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
});

app.post('/option=sendsnap', function(req, res) {

  var reponse = {
    error: 'test',
    data: req.body.data,
    token: req.body.token
  }

  res.send(JSON.stringify(reponse));

});

app.post('/option=getsnap', function(req, res) {

  var reponse = {
    error: 'test',
    data: req.body.data,
    token: req.body.token
  }

  res.send(JSON.stringify(reponse));

});

app.post('/option=viewsnap', function(req, res) {

  

});

/*app.get('/',function(req,res) {
      res.sendFile(__dirname + "/index.html");
});*/

app.post('/api/photo',function(req,res){
  console.log(req.file);

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded and email as send");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});