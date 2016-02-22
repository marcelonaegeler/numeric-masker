;{
	"use strict";
	var deniedKeys = [ 8, 9, 13, 16, 17, 18, 37, 38, 39, 40 ];
	
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

		var tokens = [ ':', '/', '-', '(', ')', ' ', '.' ];
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
			var c = 0;
			var vLength = v.length;
			while ( c < original_pattern.length ) {
				var original_char = original_pattern.charAt( vLength );
				if ( tokens.indexOf( original_char ) > -1 && deniedKeys.indexOf( event.keyCode ) === -1 ) {
					this.value += original_char;
					vLength = this.value.length;
				}

				c++;
			}

			if ( 
				(
					this.value.length >= maxLength // If the length is too long
					|| /[0-9]/g.test( event.key ) === false // All chars that aren't numbers
				)
				&& ( deniedKeys.indexOf( event.keyCode ) === -1 ) // If it's not a special key
				&& ( !event.altKey && !event.ctrlKey && !event.shiftKey ) // If it's not action keys
			) {
				return false;
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
