/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function save( props ) {

	const {
		attributes,
	} = props;

	const {
		storyLinesMainBackgroundColor,
		storyLinesTitleBackgroundColor,
		storyLinesTitleColor,
		storyLinesMainColor,
		storyLinesMainBackgroundColorValue,
		storyLinesTitleBackgroundColorValue,
		storyLinesTitleColorValue,
		storyLinesMainColorValue,
		gradient,
		customGradient,
	} = attributes;

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



	const storyLinesMainBackgroundClasses = classnames( 'story-lines-main', {
		'has-slider-background-color':
			storyLinesMainBackgroundColor.color ||
			storyLinesMainBackgroundColorValue ||
			gradient ||
			customGradient,
		[ `has-${ storyLinesMainBackgroundColor.slug }-background-color` ]: storyLinesMainBackgroundColor.slug,
	} );

	const storyLinesMainBackgroundStyles = {
		background: ! gradient ? customGradient : undefined,
		backgroundColor: storyLinesMainBackgroundColorValue,
	};

	const storyLinesTitleClasses = classnames( 'story-lines-title', {
		'has-slider-background-color':
			storyLinesTitleBackgroundColor.color ||
			storyLinesTitleBackgroundColorValue ||
			gradient ||
			customGradient,
		[ `has-${ storyLinesTitleBackgroundColor.slug }-background-color` ]: storyLinesTitleBackgroundColor.slug,
		'has-slider-color':
			storyLinesTitleColor.color ||
			storyLinesTitleColorValue ||
			gradient ||
			customGradient,
		[ `has-${ storyLinesTitleColor.slug }-color` ]: storyLinesTitleColor.slug,
	} );

	const storyLinesTitleStyles = {
		color: storyLinesTitleColorValue,
		background: ! gradient ? customGradient : undefined,
		backgroundColor: storyLinesTitleBackgroundColorValue,
	};

	const storyLinesMainClasses = classnames( 'story-lines-links', {
		'has-slider-color':
			storyLinesMainColor.color ||
			storyLinesMainColorValue ||
			gradient ||
			customGradient,
		[ `has-${ storyLinesMainColor.slug }-color` ]: storyLinesMainColor.slug,
	} );

	const storyLinesMainStyles = {
		color: storyLinesMainColorValue,
	};

	const highlightDisplay = props.attributes.story_lines_highlights.map( ( highlight, index ) => {
		return <li key={ index } className={ storyLinesMainClasses } style={ storyLinesMainStyles }><a href={ '#' + highlight.target } className={ storyLinesMainClasses } style={ storyLinesMainStyles }>{ highlight.text }</a></li>;
	} );

	return (
		<div { ...useBlockProps.save( {
			'className': storyLinesMainBackgroundClasses,
			'style': storyLinesMainBackgroundStyles
		} ) }>
			<h2  className={ storyLinesTitleClasses } style={ storyLinesTitleStyles }> { props.attributes.story_lines_title }</h2>
			<ul>
				{ highlightDisplay }
			</ul>
		</div>
	);
}
