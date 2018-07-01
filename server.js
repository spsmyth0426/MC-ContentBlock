'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
//var routes      = require('./routes');
//var activity    = require('./routes/activity');

var app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.set('view engine', 'ejs');
//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// HubExchange Routes
//app.get('/', routes.index );
app.get('/', function(request, response, next) {
    if (window.self === window.top) {
      document.body.innerText = 'This application is for use in the Salesforce Marketing Cloud Content Builder Editor only.';
    } else {
        var sdk = new BlockSDK();
        sdk.getContent(function (content) {
            //quill.root.innerHTML = content;
            function saveText() {
                /********Setup Sync*******/
                const options = {
                    uri: '/data/v1/async/dataextensions/key:'+platformDE+'/rows',
                    headers: {},
                    body: {"items": [{
                        "Id":"1",
                        "Name":"Category",
                        "Value" : "BarCode",
                        "EmailId": "23456"
                    }]}
                    // other request options
                };
        

                /********Set Content*******/
                //var html = quill.root.innerHTML;
                //sdk.setContent(html);
                RestClient.put(options)
                .then(response => {
                    // will be delivered with 200, 400, 401, 500, etc status codes
                    // response.body === payload from response
                    // response.res === full response from request client
                    console.log(response);
                })
                .catch(err => console.log(err));
                //sdk.setContent('Set @name = "Barcode"');
                sdk.setSuperContent('This is super content: ' + html);

                /********Get Content*******/
                sdk.getData(function (data) {
                    var numberOfEdits = data.numberOfEdits || 0;
                    sdk.setData({
                        numberOfEdits: numberOfEdits + 1
                    });
                });
                sdk.getCentralData(function (central) {
                    var totalNumberOfEdits = central.totalNumberOfEdits || 0;
                    sdk.setCentralData({
                        totalNumberOfEdits: totalNumberOfEdits + 1
                    });
                });
            }
            
            playground();
            sdk.setSuperContent('This is super content: ' + html);
            //quill.on('text-change', saveText);
            console.log('Inside getContent');
            
            response.render('test.html', {});
        });

    }
  logData(req);
  });

//app.get('/blockSave', routes.blockSave );
app.get('/test', function(request, response, next) {
  
      response.render('test.ejs', {
      });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Shanes Express server listening on port ' + app.get('port'));
});