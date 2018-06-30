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

/*
 * GET home page.
 */
exports.index = function(req, res){
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
        });

    }
    res.render( 'index', {
        title: 'MC CB Custom Attributes',
        results: activity.logExecuteData,
    });
};

exports.blockSave = function( req, res ) {
    console.log( 'req.body: ', req.body );
    sdk.setContent(function (content) {
        sdk.setContent('Set @name = "Barcode"');
        console.log('Inside setContent');
    });
};

function playground(){
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