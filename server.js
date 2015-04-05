var express = require('express'),
	routes = require('./routes'),
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
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
 
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}
 
app.get('/', routes.index);
app.get('/create', routes.create);

app.listen(3000, function(){
	console.log('I\'m listening');
});