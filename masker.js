;( function () {
	"use strict";

	var validations = {

		cep: function () {
			var v = this.value;
			v = v.replace( /\D/g, '' );
			v = v.replace( /(\d{5})(\d{3})(\d+)?/g, '$1-$2' );

			this.value = v;
		}

		, date: function () {
			var v = this.value;
			v = v.replace( /\D/g, '' );
			v = v.replace( /(\d{2})(\d{2})(\d{4})(\d+)?/g, '$1/$2/$3' );

			this.value = v;
		}

		, simpleDate: function () {
			var v = this.value;
			v = v.replace( /\D/g, '' );
			v = v.replace( /(\d{2})(\d{2})(\d+)?/g, '$1/$2' );

			this.value = v;
		}

		, number: function () {
			var v = this.value;
			v = v.replace( /\D/g, '' );

			this.value = v;
		}

		, phone: function () {
			var v = this.value;
			v = v.replace( /\D/g, '' );
			var l = v.length;

			if ( l <= 10 ) {
				v = v.replace( /(\d{2})(\d{4})(\d{4})(\d+)?/g, '($1) $2-$3' );
			} else {
				v = v.replace( /(\d{2})(\d{5})(\d{4})(\d+)?/g, '($1) $2-$3' );
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

		var dont_validate_keys = [ 9, 13, 16, 17, 18, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 225 ];
		
		var callValidation = function ( event ) {

			if ( dont_validate_keys.indexOf( event.keyCode ) === -1 ) {
				validations[ mask ].call( this );
			}
		};

		this.onkeyup = callValidation;
		this.onchange = callValidation;
	};

	window.Mask = Mask;

	/*
	* Initial calling
	**/
	var elements = document.getElementsByClassName( 'vmasker' );
	for ( var i = 0, l = elements.length; i < l; i++ ) {
		Mask.call( elements[ i ] );
	}

})();