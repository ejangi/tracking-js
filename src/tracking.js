/*!
 * Tracking JS
 *
 * This is a self-executing script that initialises the Google Analytics
 * tracking code without having to include any inline scripts.
 *
 * Copyright 2014 James Angus
 * Released under the MIT license
 * http://jquery.org/license
 */
var TrackingJS = ( function( window, document, undefined ) {
	var metas = document.getElementsByTagName( "meta" ) || [];

	var meta = function( key ) {
		for ( var i = 0; i < metas.length; i++ ) { 
			if ( metas[i].getAttribute( "name" ) === key ) { 
				return metas[i].getAttribute( "content" );
			}
		}
		return "";
	};

	var metasLike = function( key ) {
		var metalre = new RegExp( "^" + key + ".*" ); 
		var returns = [];
		for ( var i = 0; i < metas.length; i++ ) { 
			if ( metas[i].getAttribute( "name" ).match( metalre ) ) { 
				returns.push( metas[i] );
			}
		} 
		return returns;
	};

	var gaProtocol = function() {
		var proto = "https:";
		if ( window.location.protocol === "http:") {
			proto = "http:";
		}
		return proto;
	};

	var analyticsUrl = "//www.google-analytics.com/analytics.js",
		analyticsDebugUrl = "//www.google-analytics.com/analytics_debug.js",
		linkidUrl = "//www.google-analytics.com/plugins/ua/linkid.js",
		trackingId = meta( "ga-trackingid" ) || null,
		features = meta( "ga-features" ).split( "," ) || [],
		debug = meta( "ga-debug" ) || false,
		trace = meta( "ga-trace" ) || false,
		campaignFields = [ "campaignName", "campaignSource", "campaignMedium", "campaignContent", "campaignKeyword" ],
		dimensions = metasLike( "ga-dimension" ),
		userId = meta( "ga-userid" );

	var init = (function() {
		if ( trackingId !== null && trackingId.length > 0 ) {
			if ( debug === "true" ) {
				debug = true;
			} else {
				debug = false;
			}

			if ( trace === "true" ) {
				trace = true;
			} else {
				trace = false;
			}

			if ( debug ) {
				analyticsUrl = analyticsDebugUrl;
			}

			if ( trace ) {
				window.ga_debug = { trace: true };
			}

			analyticsUrl = gaProtocol() + analyticsUrl;

			(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
			})(window,document,"script",analyticsUrl,"ga");

			if ( typeof(ga) !== "function" ) {
				console.log("Tracking-JS failed. Google Analytics Object not loaded.");
				return;
			}

			if ( userId.length > 0 ) {
				ga( "create", trackingId, "auto", { "userId": userId } );
			} else {
				ga( "create", trackingId, "auto" );
			}
			
			if ( features.indexOf( "displayfeatures" ) > -1 ) {
				ga( "require", "displayfeatures" );
			}

			if ( features.indexOf( "linkid" ) > -1 ) {
				linkidUrl = gaProtocol() + linkidUrl;
				ga( "require", "linkid",  linkidUrl );
			}

			for ( var i = 0; i < campaignFields.length; i++ ) {
				if ( meta( campaignFields[i] ) ) {
					ga( "set", campaignFields[i], meta( campaignFields[i] ) );
				}
			}

			for ( var j = 0; j < dimensions.length; j++ ) {
				if ( meta( dimensions[i] ) ) {
					ga( "set", dimensions[i], meta( dimensions[i] ) );
				}
			}

			if ( userId.length > 0 ) {
				ga( "set", "&uid", userId );
			}
			
			ga( "send", "pageview" );
		}
	})();

	return {
		metas: metas,
		meta: meta,
		metasLike: metasLike,
		gaProtocol: gaProtocol,
		analyticsUrl: analyticsUrl,
		analyticsDebugUrl: analyticsDebugUrl,
		linkidUrl: linkidUrl,
		trackingId: trackingId,
		features: features,
		debug: debug,
		trace: trace,
		campaignFields: campaignFields,
		dimensions: dimensions,
		userId: userId,
		window: window,
		document: document
	};
} ) ( window, document );
