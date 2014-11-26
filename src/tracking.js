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
( function( window, document, undefined ) {
	var metas = document.getElementsByTagName( 'meta' ) || []

	function meta( key ) {
		for ( var i = 0; i < metas.length; i++ ) { 
			if ( metas[i].getAttribute( "name" ) == key ) { 
				return metas[i].getAttribute( "content" );
			}
		}
		return "";
	}

	function metaslike( key ) {
		var metalre = new RegExp( "^" + key + ".*" ); 
		var returns = []; 
		for ( var i = 0; i < metas.length; i++ ) { 
			if ( metas[i].getAttribute( "name" ).match( metalre ) ) { 
				returns.push( metas[i] );
			}
		} 
		return returns;
	}

	function gaProtocol() {
		var proto = 'https:';
		if ( window.location.protocol == "http:") {
			proto = "http:";
		}
		return proto;
	}

	var analyticsUrl = '//www.google-analytics.com/analytics.js',
		analyticsDebugUrl = '//www.google-analytics.com/analytics_debug.js',
		trackingId = meta( 'ga-trackingid' ) || null,
		requires = meta( 'ga-requires' ).split( ',' ) || [],
		debug = !!meta( 'ga-debug' ) || false,
		trace = !!meta( 'ga-trace' ) || false,
		campaignFields = [ 'campaignName', 'campaignSource', 'campaignMedium', 'campaignContent', 'campaignKeyword' ],
		dimensions = metaslike( 'ga-dimension' ),
		userId = meta( 'ga-userid' );

	if ( trackingId !== null && trackingId.length > 0 ) {
		if ( debug === true ) {
			analyticsUrl = analyticsDebugUrl;
		}

		if ( trace === true ) {
			window.ga_debug = { trace: true };
		}

		analyticsUrl = gaProtocol() + analyticsUrl;

		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script',analyticsUrl,'ga');

		// Double check that this is set correctly:
		ga = ga || window['GoogleAnalyticsObject'];

		ga( 'create', trackingId, 'auto' );
		
		if ( requires.indexOf( 'displayfeatures' ) > -1 ) {
			ga( 'require', 'displayfeatures' );
		}

		if ( requires.indexOf( 'linkid' ) > -1 ) {
			ga( 'require', 'linkid', 'linkid.js' );
		}

		for ( var i = 0; i < campaignFields.length; i++ ) {
			if ( meta( campaignFields[i] ) ) {
				ga( 'set', campaignFields[i], meta( campaignFields[i] ) );
			}
		}

		for ( var i = 0; i < dimensions.length; i++ ) {
			if ( meta( dimensions[i] ) ) {
				ga( 'set', dimensions[i], meta( dimensions[i] ) );
			}
		}

		if ( userId.length > 0 ) {
			ga( 'set', '&uid', userId );
		}
		
		ga( 'send', 'pageview' );
	}
} ) ( window, document );
