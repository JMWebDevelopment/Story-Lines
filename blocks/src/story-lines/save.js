/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function save( props ) {
	let divStyle = {
		backgroundColor: props.attributes.story_lines_main_background,
	};

	let h2Style = {
		backgroundColor: props.attributes.story_lines_title_background,
		color: props.attributes.story_lines_title_color,
	};

	let liStyle = {
		color: props.attributes.story_lines_main_color,
	};

	const highlightDisplay = props.attributes.story_lines_highlights.map( ( highlight, index ) => {
		return <li key={ index } style={liStyle}><a href={ '#' + highlight.target } style={liStyle}>{ highlight.text }</a></li>;
	} );

	return (
		<div { ...blockProps } style={divStyle}>
			<h2 style={h2Style}> { props.attributes.story_lines_title }</h2>
			<ul>
				{ highlightDisplay }
			</ul>
		</div>
	);
}
