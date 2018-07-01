/*requirejs.config({
    paths: {
        vendor: '../vendor',
		postmonger: 'vendor/postmonger'
    },
    shim: {
        'vendor/jquery.min': {
            exports: '$'
        },
		'customActivity': {
			deps: ['vendor/jquery.min', 'vendor/postmonger']
		},
		'blocksdk': {
			deps: ['vendor/blocksdk.min', 'vendor/postmonger']
		}
    }
});

requirejs( ['vendor/jquery.min', 'customActivity', 'blocksdk'], function( $, customActivity ) {
	console.log( 'REQUIRE LOADED' );
});

requirejs.onError = function( err ) {
	//console.log( "REQUIRE ERROR: ", err );
	if( err.requireType === 'timeout' ) {
		console.log( 'modules: ' + err.requireModules );
	}

	throw err;
};*/
var SDK = function (whitelistOverride, sslOverride) {

	// the custom block should verify it is being called from
	// the marketing cloud
	this._validateOrigin = function (origin) {
		// Make sure to escape periods since these strings are used in a regular expression
		var allowedDomains = whitelistOverride || ['marketingcloudapps\\.com', 'blocktester\\.herokuapp\\.com'];
		for (var i = 0; i < allowedDomains.length; i++) {
			// Makes the s optional in https
			var optionalSsl = sslOverride ? '?' : '';
			var whitelistRegex = new RegExp('^https' + optionalSsl + '://([a-zA-Z0-9-]+\\.)*' + allowedDomains[i] + '(:[0-9]+)?$', 'i');
			if (whitelistRegex.test(origin)) {
				return true;
			}
		}

		return false;
	};

	this._messageId = 1;
	this._messages = {
		0: function () {}
	};

	this._receiveMessage = function (message) {
		message = message || {};
		var data = message.data || {};
		if (data.method === 'handShake') {
			if (this._validateOrigin(data.origin)) {
				this._parentOrigin = data.origin;
				return;
			}
		}
		// if the message is not from the validated origin it gets ignored
		if (!this._parentOrigin || this._parentOrigin !== message.origin) {
			return;
		}
		// when the message has been received, we execute its callback
		(this._messages[data.id || 0] || function () {})(data.payload);
		delete this._messages[data.id];
	};

	window.addEventListener('message', this._receiveMessage.bind(this), false);

	this._postToEditor = function (payload, callback, ttl) {
		var self = this;
		// we only message up if we have
		// validated the origin
		if (!this._parentOrigin) {
			if (ttl === undefined || ttl > 0) {
				window.setTimeout(function () {
					self._postToEditor(payload, callback, (ttl || 5) - 1);
				}, 20);
			}
			return;
		}
		this._messages[this._messageId] = callback;
		payload.id = this._messageId;
		this._messageId += 1;
		// the actual postMessage always uses
		// the validated origin
		window.parent.postMessage(payload, this._parentOrigin);
	};

	this.getContent = function (cb) {
		this._postToEditor({
			method: 'getContent'
		}, cb);
	};

	this.setContent = function (content, cb) {
		this._postToEditor({
			method: 'setContent',
			payload: content
		}, cb);
	};

	this.setSuperContent = function (content, cb) {
		this._postToEditor({
			method: 'setSuperContent',
			payload: content
		}, cb);
	};

	this.getData = function (cb) {
		this._postToEditor({
			method: 'getData'
		}, cb);
	};

	this.setData = function (dataObj, cb) {
		this._postToEditor({
			method: 'setData',
			payload: dataObj
		}, cb);
	};

	this.getCentralData = function (cb) {
		this._postToEditor({
			method: 'getCentralData'
		}, cb);
	};

	this.setCentralData = function (dataObj, cb) {
		this._postToEditor({
			method: 'setCentralData',
			payload: dataObj
		}, cb);
	};

	window.parent.postMessage({
		method: 'handShake',
		origin: window.location.origin
	}, '*');
};

if (typeof(window) === 'object') {
	window.sfdc = window.sfdc || {};
	window.sfdc.BlockSDK = SDK;
}
if (typeof(module) === 'object') {
	module.exports = SDK;
}


(function(modules){
	var installedModules = {};

	/*function __webpack_require__(moduleId){

		if(installedModules[moduleId]){
			return installedModules[moduleId].exports;
		}

		var module = installedModules[moduleId]{
			i: moduleId,
			l: false,
			exports: {}
		};

		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		module.l = true;

		return module.exports;
	}*/

	__webpack_require__.m = modules;

    var sdk = new SDK();
            
			
	sdk.setSuperContent('This is super content: ');
        
});

$( document ).ready(function() {
	console.log( "ready!" );
	var sdk = new SDK();
            
			
	sdk.setSuperContent('This is super content: ');
});