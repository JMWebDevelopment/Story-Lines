<?php
/**
 * story-lines-admin.php
 *
 * Creates the custom fields for the post admin area
 *
 * The code for the repeatable fields comes from Helen Housandi and can be found here: https://gist.github.com/helenhousandi/1593065. Many thanks for this code.
 *
 * @author Jacob Martella
 * @package Read More About
 * @version 1.1
 * @since 1.2
 */
class Story_Lines_Widget extends WP_Widget {

	//* Construct the widget
	public function __construct() {
		parent::__construct(
			'story_lines_widget',
			__('Story Lines Widget', 'story-lines'),
			array(
				'classname' => 'story_lines_widget',
				'description' => 'Displays the story lines for an article in a widget for the sidebar.'
			)
		);
	}

	//* Output the content of the widget
	public function widget( $args, $instance ) {
		extract($args);

		if ( is_single() ) {

			if (get_post_meta(get_the_ID(), 'story_lines_highlights', true)) { $highlights = get_post_meta(get_the_ID(), 'story_lines_highlights', true); } else { $highlights = ''; }

			if ( $highlights != '' ) {

				if (get_post_meta(get_the_ID(), 'story_lines_title', true)) { $title = get_post_meta(get_the_ID(), 'story_lines_title', true); } else { $title = __('Story Lines', 'story-lines'); }

				echo $instance[ 'before_widget' ];

				echo $instance[ 'before_title' ] . $title . $instance[ 'after_title'];
				echo '<ul>';
				foreach ($highlights as $highlight) {
					echo '<li>' . $highlight['story_lines_highlight'] . '</li>';
				}
				echo '</ul>';

				echo $instance[ 'after_widget' ];

			}

		}

	}

}
add_action( 'widgets_init', function() {
	register_widget( 'Story_Lines_Widget' );
});