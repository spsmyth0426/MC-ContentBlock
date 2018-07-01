'use strict';

// Deps
var activity = require('./activity');
const FuelRest = require('fuel-rest');
const options = {
	auth: {
		// options you want passed when Fuel Auth is initialized
		clientId: 'xc29s6f8f0zil8dy8s1be2bb',
		clientSecret: 'I13izFgvSNg6xdb0mrOD7BBd'
	},
	origin: 'https://www.exacttargetapis.com' // default --> https://www.exacttargetapis.com
};

const RestClient = new FuelRest(options);

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * GET home page.
 */
exports.save = function(req, res){
    authToken('xc29s6f8f0zil8dy8s1be2bb', 'I13izFgvSNg6xdb0mrOD7BBd', 'MC_CB_Custom_Attributes');
    logData(req);
};

function playground(){
    var platformDE = 'MC_CB_Custom_Attributes';
    const options = {
        uri: '/data/v1/async/dataextensions/key:'+platformDE+'/rows',
        headers: {'Authorization: Bearer '+},
        body: {"items": [{
            "Id":"1",
            "Name":"Category",
            "Value" : "BarCode",
            "EmailId": "23456"
         }]}
        // other request options
    };

    RestClient.put(options)
    .then(response => {
        // will be delivered with 200, 400, 401, 500, etc status codes
        // response.body === payload from response
        // response.res === full response from request client
        console.log(response);
    })
    .catch(err => console.log(err));
}

/**********************/
// CALL FOR AUTHORIZATION
/**********************/
function authToken(clientId, clientSecret, de){
    var options = {
        url: 'http://auth.exacttargetapis.com/v1/requestToken',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
        form: {'clientId': clientId, 'clientSecret': clientSecret}
    }

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log('Bearer: Sucess');
            let json = JSON.parse(body);
            console.log(json);
            var accessToken = json.accessToken;
            console.log(accessToken);
            postDE(accessToken, de);
        }else{
            console.log('Bearer: Error');
        }
    })
}

/**********************/
// POST DATA
/**********************/
function postDE(accessToken, de){
    var optionsDE = {
        url: 'https://www.exacttargetapis.com/data/v1/async/dataextensions/key:'+de+'/rows',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
        },
        //form: {'values': {'ContactId': contact, 'Status': 'Confirmed', 'ResponseId': responseId}}
        body: [ {
            "items": [{
               "FirstName":"Bobby",
               "LastName" : "Jones",
               "ZipCode": "23456"
            }]
         } ],
        json: true
    }
    console.log(optionsDE);

    request(optionsDE, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log('Post to DE successful');
        }else{
            console.log('Post to DE: error');
            console.log(body);
        }
    })
}