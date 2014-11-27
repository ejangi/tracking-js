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
		requires = meta( "ga-requires" ).split( "," ) || [],
		debug = meta( "ga-debug" ) || false,
		trace = meta( "ga-trace" ) || false,
		campaignFields = [ "campaignName", "campaignSource", "campaignMedium", "campaignContent", "campaignKeyword" ],
		dimensions = metasLike( "ga-dimension" ),
		userId = meta( "ga-userid" );

	var init = (function() {
		if ( trackingId !== null && trackingId.length > 0 ) {
			if ( debug && debug === "true" ) {
				debug = true;
			}

			if ( trace && trace === "true" ) {
				trace = true;
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

			ga( "create", trackingId, "auto" );
			
			if ( requires.indexOf( "displayfeatures" ) > -1 ) {
				ga( "require", "displayfeatures" );
			}

			if ( requires.indexOf( "linkid" ) > -1 ) {
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
		requires: requires,
		debug: debug,
		trace: trace,
		campaignFields: campaignFields,
		dimensions: dimensions,
		userId: userId,
		window: window,
		document: document
	};
} ) ( window, document );

// addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
// See: https://gist.github.com/eirikbacker/2864711
(function(win, doc){
	if(win.addEventListener)return;		//No need to polyfill
 
	function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
	function addEvent(on, fn, self){
		return (self = this).attachEvent('on' + on, function(e){
			var e = e || win.event;
			e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
			e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
			fn.call(self, e);
		});
	}
	function addListen(obj, i){
		if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
		else obj.addEventListener = addEvent;
		return obj;
	}
 
	addListen([doc, win]);
	if('Element' in win)win.Element.prototype.addEventListener = addEvent;			//IE8
	else{		//IE < 8
		doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});		//Make sure we also init at domReady
		docHijack('getElementsByTagName');
		docHijack('getElementById');
		docHijack('createElement');
		addListen(doc.all);	
	}
})(window, document);

TrackingJS.Events = ( function( parent ) {

	var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i,
		anchors = parent.document.getElementsByTagName( "a" );

	var clickHandler = function( event ) {
		var el = event.target,
			track = true,
			href = ( typeof( el.readAttribute("href") ) !== "undefined" ) ? el.readAttribute( "href" ) : "",
			isThisDomain = href.match( document.domain.split( "." ).reverse()[1] + "." + document.domain.split( "." ).reverse()[0] );
		
		if ( !href.match( /^javascript:/i ) ) {
			var elEv = []; elEv.value = 0, elEv.non_i = false;
			if ( href.match( /^mailto\:/i ) ) {
				elEv.category = "email";
				elEv.action = "click";
				elEv.label = href.replace(/^mailto\:/i, "");
				elEv.loc = href;
			}
			else if ( href.match( filetypes ) ) {
				var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
				elEv.category = "download";
				elEv.action = "click-" + extension[0];
				elEv.label = href.replace(/ /g, "-");
				elEv.loc = href;
			}
			else if ( href.match( /^https?\:/i ) && !isThisDomain ) {
				elEv.category = "external";
				elEv.action = "click";
				elEv.label = href.replace( /^https?\:\/\//i, "" );
				elEv.non_i = true;
				elEv.loc = href;
			}
			else if (href.match( /^tel\:/i )) {
				elEv.category = "telephone";
				elEv.action = "click";
				elEv.label = href.replace( /^tel\:/i, "" );
				elEv.loc = href;
			}
			else {
				track = false;
			}

			if (track) {
				if ( typeof(ga) === "function" ) {
					ga("send", "event", elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value);
				}

				if ( el.readAttribute( "target" ) === undefined || el.readAttribute( "target" ).toLowerCase() !== "_blank" ) {
			    	setTimeout( function() { location.href = elEv.loc; }, 400 );
			    	event.stopPropagation();
					event.preventDefault();
			    	return false;
				}
			}
		}
	};

	var trackAnchorClicks = function() {
		for ( var a = 0; a < anchors.length; a++ ) {
			anchors[a].addEventListener( "click", clickHandler, false );
		}
	};

	var init = ( function() {
		if ( parent.requires.indexOf( "events" ) === -1 ) {
			return;
		}

		trackAnchorClicks();
	})();

	return {
		filetypes: filetypes,
		anchors: anchors,
		clickHandler: clickHandler
	};

} ) ( TrackingJS || {} );