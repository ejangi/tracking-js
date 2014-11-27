TrackingJS.Events = ( function( parent ) {

	var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i,
		anchors = parent.document.getElementsByTagName( "a" );

	var clickHandler = function( event ) {
		var el = event.target,
			track = true,
			href = ( typeof( el.href ) !== "undefined" ) ? el.href : "",
			isThisDomain = href.match( document.domain.split( "." ).reverse()[1] + "." + document.domain.split( "." ).reverse()[0] );
		
		if ( !href.match( /^javascript:/i ) ) {
			var elEv = []; elEv.value = 0, elEv.non_i = false;
			if ( href.match( /^mailto\:/i ) ) {
				elEv.category = "email";
				elEv.action = "click";
				elEv.label = href;
				elEv.loc = href;
			}
			else if ( href.match( filetypes ) ) {
				var extension = ( /[.]/.exec( href ) ) ? /[^.]+$/.exec(href) : undefined;
				elEv.category = "download";
				elEv.action = "click-" + extension[0];
				elEv.label = href;
				elEv.loc = href;
			}
			else if ( href.match( /^https?\:/i ) && !isThisDomain ) {
				elEv.category = "external";
				elEv.action = "click";
				elEv.label = href;
				elEv.loc = href;
			}
			else if ( href.match( /^#/i ) ) {
				elEv.category = "bookmark";
				elEv.action = "click";
				elEv.label = href;
				elEv.non_i = true;
				elEv.loc = href;
			}
			else if ( href.match( /^tel\:/i ) ) {
				elEv.category = "telephone";
				elEv.action = "click";
				elEv.label = href;
				elEv.loc = href;
			}
			else {
				track = false;
			}

			if (track) {
				if ( elEv.non_i ) {
					ga( "send", "event", elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, { "nonInteraction": 1 } );
				} else {
					ga( "send", "event", elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value );
				}

				if ( el.target === undefined || el.target.toLowerCase() !== "_blank" ) {
			    	setTimeout( function() { location.href = elEv.loc; }, 400 );
			    	return false;
				}
			}
			return true;
		}
	};

	var trackAnchorClicks = function() {
		for ( var a = 0; a < anchors.length; a++ ) {
			anchors[a].addEventListener( "click", clickHandler, false );
		}
	};

	var init = ( function() {
		if ( parent.features.indexOf( "events" ) === -1 ) {
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
