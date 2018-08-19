'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var sports    = require('./routes/sports');

var app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.get('/', function(request, response, next) {
});

app.get('/load', function(request, response, next) {
  response.render('load.ejs', {
  });
});

app.get('/sportsBlock', function(request, response, next) {
  response.render('sportsBlock.ejs', {
  });
});

app.get('/imageBlock', function(request, response, next) {
  response.render('imageBlock.ejs', {
  });
});

app.get('/astroBlock', function(request, response, next) {
  response.render('astroBlock.ejs', {
  });
});

app.get('/dynamicBlock', function(request, response, next) {
  response.render('dynamicBlock.ejs', {
  });
});

app.post('/save', routes.save );

app.post('/sportsEndPoint', sports.sportsEndPoint );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Shanes Express server listening on port ' + app.get('port'));
});