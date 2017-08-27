<?php
/**
 * story-lines-widget.php
 *
 * Creates the contextual help if a user has a question about how to use the plugin
 *
 * @author Jacob Martella
 * @package Read More About
 * @version 1.5
 * @since 1.2
 */
function story_lines_contextual_help( $contextual_help, $screen_id, $screen ) {
	if ( ($screen->id == 'post') ) {
		$contextual_help = '<h2>' . __( 'Story Lines Help', 'jm-breaking-news' ) . '</h2>';
		$contextual_help .= '<ul>';
		$contextual_help .= '<li>' . __( 'Anchor Links', 'jm-breaking-news' ) . '<br />' . __( 'To create and add anchor links to the story lines, first wrap the area you want to jump to in a div or span and give the element an id (i.e. &lt;span id="your-id"&gt;). Then add the id you have given the section to the appropriate story line.', 'jm-breaking-news' ) . '</li>';
		$contextual_help .= '</ul>';
	}

	return $contextual_help;
}
add_action( 'contextual_help', 'story_lines_contextual_help', 10, 3 );