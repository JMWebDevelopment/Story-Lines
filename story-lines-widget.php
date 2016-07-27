<?php
/**
 * story-lines-widget.php
 *
 * Creates the widget to show the story lines in the sidebar of a single post
 *
 * @author Jacob Martella
 * @package Read More About
 * @version 1.2
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

				echo $before_widget;

				echo $before_title . $title . $after_title;
				echo '<ul>';
				foreach ($highlights as $highlight) {
					if ( isset( $highlight[ 'story_lines_anchor_id' ] ) ) {
						echo '<li><a href="#' . $highlight[ 'story_lines_anchor_id' ] . '">' . $highlight['story_lines_highlight'] . '</a></li>';
					} else {
						echo '<li>' . $highlight['story_lines_highlight'] . '</li>';
					}
				}
				echo '</ul>';

				echo $after_widget;

			}

		}

	}

}
add_action( 'widgets_init', function() {
	register_widget( 'Story_Lines_Widget' );
});