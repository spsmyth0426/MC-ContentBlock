'use strict';

// Deps
var activity = require('./activity');
var request     = require('request');
var util = require('util');

var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.2", true);
msf.authenticate("c2791441-c7ce-492e-b5b4-d47ce8", "kf45wxB6");


/*
 * GET home page.
 */
exports.sportsEndPoint = function(req, res){
    /*var deExternalKey = req.body.deExternalKey;
    var keys = req.body.keys;
    var values = req.body.values;
    console.log(deExternalKey);*/

    var data = msf.getData('nba', '2017-2018-regular', 'player_gamelogs', 'json', {});

    //pullSports('nba', '2016-2017-regular', 'player_gamelogs', 'json', "{player: 'stephen-curry'}");

    console.log('NBA: '+JSON.stringify(data, null, 2));
};

function pullSports(league, season, route, format, params){
    var optionsDE = {
        url: 'https://api.mysportsfeeds.com/v2.0/pull/'+league+'/'+season+'/'+route+'.'+format,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
        },
        //form: {'values': {'ContactId': contact, 'Status': 'Confirmed', 'ResponseId': responseId}}
        body: [ { "items": inArgs } ],
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