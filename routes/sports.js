'use strict';

// Deps
var activity = require('./activity');
var request     = require('request');
var util = require('util');

var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.2", true,  null);
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

    console.log('NBA: '+JSON.stringify(data, null, 2));
};
