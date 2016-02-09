# Vanilla Numeric Masker
A vanilla input masker for numeric fields.

### Usage
See ```index.html``` for examples.

0. Via DOM element
		
		<input type="text" name="cep" class="vmasker" data-masker-pattern="99999-999">

0. Via JS script
		
		<input type="text" name="cep" id="cep">
		<script>
			Mask.call( document.getElementById( 'cep' ), '99999-999' );
		</script>

The class ```vmasker``` is used when the script runs on first time.