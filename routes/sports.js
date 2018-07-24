'use strict';

// Deps
var activity = require('./activity');
var request     = require('request');
var util = require('util');

var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.2", true);
msf.authenticate("spsmyth0426", "kf45wxB6");


/*
 * GET home page.
 */
exports.sportsEndPoint = function(req, res){
    /*var deExternalKey = req.body.deExternalKey;
    var keys = req.body.keys;
    var values = req.body.values;
    console.log(deExternalKey);*/

    var data = msf.getData('nba', '2016-2017-regular', 'player_gamelogs', 'json', {player: 'stephen-curry'});

    console.log('NBA: '+data);
};

/**********************/
// CALL FOR AUTHORIZATION
/**********************/
/*function authToken(clientId, clientSecret, deExternalKey, keys, values){
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
            postDE(accessToken, deExternalKey, keys, values);
        }else{
            console.log('Bearer: Error');
        }
    })
}*/

/**********************/
// POST DATA
/**********************/
/*function postDE(accessToken, deExternalKey, keys, values){
    var optionsDE = {
        url: 'https://www.exacttargetapis.com/hub/v1/dataevents/key:MC_CB_Custom_Attributes/rowset',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
        },
        body: [{
            keys,
            values
         }],
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
}*/