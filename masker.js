;{
	"use strict";
	var deniedKeys = [ 8, 9, 13, 16, 17, 18 ];

	var Mask = function ( mask ) {
		var input = this;
		
		var original_pattern;
		if ( mask ) {
			original_pattern = mask;
		} else if ( this.dataset.maskerPattern ) {
			original_pattern = this.dataset.maskerPattern;
		} else {
			throw Error( 'Mask pattern has not been specified.' );
		}
		
		var maxLength = original_pattern.length;

		var tokens = [ ':', '/', '-', '(', ')', ' ' ];
		var addToken = null;

		var verify = function () {
			var v = input.value.split( '' );
			for ( var i = 0, l = v.length; i < l; i++ ) {
				if ( /[0-9]/.exec( v[ i ] ) === null && tokens.indexOf( v[ i ] ) === -1 ) {
					v.pop();
				}
			}
			input.value = v.join( '' );
		};

		/*
		* Handle change
		**/
		this.onchange = verify;

		/*
		* Handle keydown
		**/
		this.onkeydown = function ( event ) {
			var v = this.value;
			
			verify();

			/*
			* Get the tokens
			**/
			var original_char = original_pattern.charAt( v.length );
			if ( tokens.indexOf( original_char ) > -1 ) {
				if ( deniedKeys.indexOf( event.keyCode ) === -1 ) {
					this.value += original_char;
				}
			}

			if ( this.value.length >= maxLength && deniedKeys.indexOf( event.keyCode ) === -1 ) {
				return false;
			}
		};

		/*
		* Handle keyup
		**/
		this.onkeyup = function ( event ) {
			var v = this.value;
			var pattern = original_pattern.substr( 0, v.length ).replace( /9/g, '[0-9]' );
			var isValid = ( new RegExp( pattern ) ).exec( v );

			if ( isValid === null ) {
				this.value = v.substr( 0, v.length - 1 );
			}
		};

		verify();
	};

	/*
	* Initial calling
	**/
	var elements = document.getElementsByClassName( 'vmasker' );
	for ( let i = 0, l = elements.length; i < l; i++ ) {
		Mask.call( elements[ i ] );
	}

}
