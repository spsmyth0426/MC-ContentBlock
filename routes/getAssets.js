'use strict';
var util = require('util');

// Deps
const Path = require('path');
var util = require('util');
var http = require('https');
var request = require('request');
var SDK = require('blocksdk');

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
 * POST Handler for /execute/ route of Activity.
 */
exports.index = function (req, res) {

    authToken(process.env.clientId, process.env.clientSecret, 'LogDE');

    /*if (req.body.inArguments.length > 0) {
            
        // decoded in arguments
        var inArgs = req.body.inArguments[0];
        console.log(inArgs);
        var colValArray = { "EmailAddress": "shane.smyth@slalom.com", "FirstName": "Shane" };
        authToken(process.env.clientId, process.env.clientSecret, 'LogDE', inArgs);

        logData(req);
        res.send(200, 'Execute');
    } else {
        console.error('inArguments invalid.');
        return res.status(400).end();
    }*/

    //logData(req);
    //res.send(200, 'Execute');
};


/**********************/
// CALL FOR AUTHORIZATION
/**********************/
function authToken(clientId, clientSecret, assetId){
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
            getAsset(accessToken, assetId);
        }else{
            console.log('Bearer: Error');
        }
    })
}

/**********************/
// POST DATA
/**********************/
function getAsset(accessToken, assetId){
    var optionsAsset = {
        url: 'https://www.exacttargetapis.com/asset/v1/content/assets/'+assetId,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
        }
    }
    console.log(optionsAsset);

    request(optionsAsset, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log('Post to DE successful');
            let jsonAsset = JSON.parse(body);
            console.log(jsonAsset);
            var content = jsonAsset.content;
            console.log(content);
        }else{
            console.log('Post to DE: error');
            console.log(body);
        }
    })
}

