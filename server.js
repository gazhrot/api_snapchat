var express    = require("express");
var multer     = require('multer');
var app        = express();
var path       = require('path');
var qs         = require('querystring');
var formidable = require("formidable");
var util       = require('util');
var bodyParser = require('body-parser');
//var connection = require('./modules/mysql');

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
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage : storage}).single('snap');

app.use('/user'    , require('./routes/inscription_route.js'));
app.use('/user'    , require('./routes/connection_route.js'));
app.use('/user'    , require('./routes/alluser_route.js'));
app.use('/snap'    , require('./routes/sendsnap_route.js'));
app.use('/snap'    , require('./routes/getsnap_route.js'));
app.use('/snap'    , require('./routes/viewsnap_route.js'));
app.use('/uploads' , require('./routes/uploadsnap_route.js'));

app.listen(5000,function(){
    console.log("Working on port 5000");
});