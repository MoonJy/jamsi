var express = require('express')
, http = require('http')
, app = express()
, server = http.createServer(app);

var bodyParser = require('body-parser');
var core = require('./routes/core.js');
var user = require('./routes/user.js');
var like = require('./routes/like.js');
var poem = require('./routes/poem.js');
var subs = require('./routes/subs.js');
var report = require('./routes/report.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', core);
app.use('/emotion', emotion);
app.use('/user', user);
app.use('/like', like);
app.use('/poem', poem);
app.use('/subs', subs);
app.use('/report', report);

var mysql = require('mysql'); 
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password: 'poemoment',
	database: 'db_poemoment'
});

connection.connect(function(err){
	if (err){
		console.log('mysql connection is fail');
		console.log(err);
		throw err;
	} else {
		console.log('mysql connection is success');
	}
});

server.listen(8000, function() {
	console.log('Express server listening on port ' + server.address().port);
});
