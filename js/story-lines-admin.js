jQuery(document).ready(function( $ ){
	$( '#add-row' ).on('click', function() {
		var row = $( '.empty-row.screen-reader-text' ).clone(true);
		row.addClass('new-row link-fields');
		row.removeClass( 'empty-row screen-reader-text' );
		row.insertAfter( '.link-fields:last' );
		$('.new-row .new-field').attr("disabled",false);
		return false;
	});
  	
	$( '.remove-row' ).on('click', function() {
		$(this).parents('section').remove();
		return false;
	});

});