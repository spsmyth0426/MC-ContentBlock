'use strict';

// Deps
var activity = require('./activity');
var platformDE = 'MC_CB_Custom_Attributes'
var BlockSDK = require('blocksdk');
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
    playground();
    logData(req);
};

function playground(){
    var platformDE = 'MC_CB_Custom_Attributes';
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

    RestClient.put(options)
    .then(response => {
        // will be delivered with 200, 400, 401, 500, etc status codes
        // response.body === payload from response
        // response.res === full response from request client
        console.log(response);
    })
    .catch(err => console.log(err));
}