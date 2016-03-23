;( function () {
	"use strict";
	var deniedKeys = [ 8, 9, 13, 16, 17, 18, 35, 36, 37, 38, 39, 40, 46 ];


	var maxLength = {
		phone: 15
		, date: 10
	}

	var validations = {
		phone: function ( event ) {
			var v = this.value;
			var l = v.length;

			v = v.replace( /\D/g, '' );

			if ( deniedKeys.indexOf( event.keyCode ) === -1 ) {
				v = v.replace( /^\(?(\d{2})\)?\s?/g, '($1) ' );
			}
			
			if ( l === 13 || l === 14 || ( event.type === 'change' && ( l === 10 || l === 11 ) ) ) {
				v = v
					.replace( /(\d{5})\-?(\d{3})$/g, '$1$2' )
					.replace( /(\d{4})\-?(\d{4})$/g, '$1-$2' );
			} else if ( l === 15 ) {
				v = v					
					.replace( /(\d{4})\-?(\d{5})$/g, '$1$2' )
					.replace( /(\d{5})\-?(\d{4})$/g, '$1-$2' );
			}

			this.value = v;
		}
		, date: function ( event ) {
			var v = this.value;
			var l = v.length;

			v = v.replace( /\D/g, '' );

			var isDeniedKey = deniedKeys.indexOf( event.keyCode ) > -1;
			if ( l === 10 && !isDeniedKey ) {
				return false;
			}

			if ( l <= 3 ) {
				v = v.replace( /^(\d{2})\/?(\d{2})?/g, '$1/$2' );
			} else if ( l <= 6 ) {
				v = v.replace( /^(\d{2})\/?(\d{2})\/?/g, '$1/$2'+ ( !isDeniedKey ? '/' : '' ) );
			} else {
				v = v.replace( /^(\d{2})\/?(\d{2})\/?(\d{4})?/g, '$1/$2/$3' );
			}
			this.value = v;
		}
	};

	var Mask = function ( mask ) {
		var input = this;
		var mask = this.dataset.masker;

		if ( !validations[ mask ] ) {
			return console.error( 'Mask '+ mask +' is not defined!' );
		}
		
		this.onkeyup = function ( event ) {
			validations[ mask ].call( this, event );
		};

		this.onchange = function ( event ) {
			validations[ mask ].call( this, event );
		};

		this.onkeydown = function ( event ) {
			var k = event.keyCode;
			if (
				deniedKeys.indexOf( k ) === -1
				&& ( 
					( ( k < 96 || k > 105 ) && ( k < 48 || k > 57 ) ) || this.value.length >= maxLength[ mask ]
				)
			) {
				return false;
			}

		}
	};

	window.Mask = Mask;

	/*
	* Initial calling
	**/
	var elements = document.getElementsByClassName( 'vmasker' );
	for ( let i = 0, l = elements.length; i < l; i++ ) {
		Mask.call( elements[ i ] );
	}

})();