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
* @version 1.0
*/
/* Set up the float array */
$float_array = [];
$float_array['left'] = 'Left';
$float_array['center'] = 'Center';
$float_array['right'] = 'Right';

add_action('admin_init', 'story_lines_add_meta_boxes');

//* Add the meta box
function story_lines_add_meta_boxes() {
	add_meta_box( 'story-lines-meta', __('Add Story Lines', 'story-lines') , 'story_lines_meta_box_display', 'post', 'normal', 'default');
}
//* Create the meta box
function story_lines_meta_box_display() {
	global $post;
	global $float_array;
	if (get_post_meta($post->ID, 'story_lines_title', true)) { $title = get_post_meta($post->ID, 'story_lines_title', true); } else { $title = ''; }
	if (get_post_meta($post->ID, 'story_lines_size', true)) { $size = get_post_meta($post->ID, 'story_lines_size', true); } else { $size = ''; }
	if (get_post_meta($post->ID, 'story_lines_float', true)) { $float = get_post_meta($post->ID, 'story_lines_float', true); } else { $float = ''; }
	$highlights = get_post_meta($post->ID, 'story_lines_highlights', true);
	wp_nonce_field( 'story_lines_meta_box_nonce', 'story_lines_meta_box_nonce' );
  
	echo '<div id="repeatable-fieldset-one" width="100%">';

	echo '<p>';
	echo '<label for="story_lines_title">' . __('Title:', 'story-lines') . '</label>';
	echo '<input type="text" name="story_lines_title" id="story_lines_title" value="' . $title . '" />';
	echo '</p>';

	echo '<p>';
	echo '<label for="story_lines_size">' . __('Size (as a percentage): ', 'story-lines') . '</label>';
	echo '<input type="number" name="story_lines_size" id="story_lines_size" value="' . $size . '" max="100" min="1" />';
	echo '</p>';

	echo '<p>';
	echo '<label for="story_lines_float">' . __('Float:', 'story-lines') . '</label>';
	echo '<select name="story_lines_float" id="story_lines_float">';
	foreach ($float_array as $key => $name) {
		if ($key == $float) {
			$selected = 'selected="selected"';
		} else {
			$selected = '';
		}
		echo '<option value="' . $key . '" ' . $selected . '>' . $name . '</option>';
	}
	echo '</select>';
	echo '</p>';
	
	//* Check for fields already filled out
	if ( $highlights ) {
	
		//* Loop through each link the user has already entered
		foreach ( $highlights as $highlight ) {
		echo '<section class="link-fields">';
			echo '<p>';
				echo '<label for="story_lines_highlight">' . __('Story Line:', 'story-lines') . '</label><br />';
				echo '<input type="text" name="story_lines_highlight[]" id="story_lines_highlight" value="' . $highlight['story_lines_highlight'] . '" />';
			echo '</p>';
			echo '<a class="button remove-row" href="#">' . __('Remove Line', 'story-lines') . '</a>';
		echo '</section>';

		} //* End foreach

	} else {
	//* Show a blank set of fields if there are no fields filled in
		echo '<section class="link-fields">';
		echo '<p>';
		echo '<label for="story_lines_highlight">' . __('Story Line:', 'story-lines') . '</label><br />';
		echo '<input type="text" name="story_lines_highlight[]" id="story_lines_highlight" value="" />';
		echo '</p>';

			echo '<a class="button remove-row" href="#">' . __('Remove Line', 'story-lines') . '</a>';
		
		echo '</section>';
	}
	
	//* Set up a hidden group of fields for the jQuery to grab
	echo '<section class="empty-row screen-reader-text">';
	echo '<p>';
	echo '<label for="story_lines_highlight">' . __('Story Line', 'story-lines') . '</label><br />';
	echo '<input class="new-field" type="text" name="story_lines_highlight[]" id="story_lines_highlight" value="" disabled="disabled" />';
	echo '</p>';
		  
		echo '<a class="button remove-row" href="#">' . __('Remove Line', 'story-lines') . '</a>';
	echo '</section>';
	
	echo '</div>';
	echo '<p><a id="add-row" class="button" href="#">' . __('Add Story Line', 'story-lines') . '</a></p>';
	
}
add_action('save_post', 'story_lines_meta_box_save');
function story_lines_meta_box_save($post_id) {
	if ( ! isset( $_POST['story_lines_meta_box_nonce'] ) ||
	! wp_verify_nonce( $_POST['story_lines_meta_box_nonce'], 'story_lines_meta_box_nonce' ) )
		return;
	
	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
		return;
	
	if (!current_user_can('edit_post', $post_id))
		return;
	
	$old = get_post_meta($post_id, 'story_lines_highlights', true);
	$new = array();

	$lines = $_POST['story_lines_highlight'];
	
	$num = count($lines);

	if(isset($_POST['story_lines_title'])) {
		update_post_meta($post_id, 'story_lines_title', wp_filter_nohtml_kses($_POST['story_lines_title']));
	}

	if(isset($_POST['story_lines_size'])) {
		update_post_meta($post_id, 'story_lines_size', wp_filter_nohtml_kses($_POST['story_lines_size']));
	}

	if(isset($_POST['story_lines_float'])) {
		update_post_meta($post_id, 'story_lines_float', wp_filter_nohtml_kses($_POST['story_lines_float']));
	}
	
	for ( $i = 0; $i < $num; $i++ ) {

			if(isset($lines[$i])) {
        		$new[$i]['story_lines_highlight'] = wp_filter_nohtml_kses($lines[$i]);
    		}


    		/*if (isset($in_link[$i]) && array_key_exists($in_link[$i], $posts_array)) {
				$new[$i]['read_more_about_internal_link'] = wp_filter_nohtml_kses($in_link[$i]);
			}*/
		}

	if ( !empty( $new ) && $new != $old ) {
		update_post_meta( $post_id, 'story_lines_highlights', $new );
	} elseif ( empty($new) && $old ) {
		delete_post_meta( $post_id, 'story_lines_highlights', $old );
	}
}
?>