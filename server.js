var express = require('express')
  , path = require('path')
  , logger = require('morgan')
  , bodyParser = require('body-parser');

var app = express();

app.set('json spaces', 2);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.all('/*', function(req, res, next) {
  // CORS stuff.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Validation middleware.
// Validates the token, only when the /api/* route is requested.
app.all('/api/*', [require('./middleware/validateIncomingRequest')]);

app.use('/', require('./routes'));

// 404.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  res.status(404);
  res.json({
    "status": 404,
    "message": "Resource not found",
    "error": err
  });
});

// Start server.
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + server.address().port);
});