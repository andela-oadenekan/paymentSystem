var express = require('express'),
	routes = require('./routes'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	session = require('express-session'),
	http = require('http'),
	path = require('path')
	fs = require('fs'),
	app = express();
 
try {
  var configJSON = fs.readFileSync(__dirname + '/config.json');
  var config = JSON.parse(configJSON.toString());
} catch (e) {
  console.error("File config.json not found or is invalid: " + e.message);
  process.exit(1);
}
routes.init(config);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/views/index.html');
});

app.set('port', config.port || process.env.PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// app.use(express.favicon());
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
//setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.write('you posted:\n');
  res.end(JSON.stringify(req.body, null, 2));
});
// app.use(express.methodOverride());
// app.use(express.cookieParser('your secret here'));
// app.use(express.session());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
 
// if ('development' === app.get('env')) {
//   app.use(express.errorHandler());
// }
 
app.get('/', routes.index);
app.get('/create', routes.create);

app.listen(3000, function(){
	console.log('I\'m listening');
});