import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	ContrastChecker,
	withColors,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings, // eslint-disable-line
	__experimentalUseGradient as useGradient, // eslint-disable-line
} from '@wordpress/block-editor';
import {
	Button,
    IconButton,
    PanelBody,
    TextControl,
    ColorPalette,
    SelectControl,
    URLInput,
    PanelColorSettings,
    AlignmentToolbar,
    BlockControls,
	ComboboxControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	PanelColor,
	Fragment,
} from '@wordpress/editor';
import {
	useState,
} from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export function Edit( props ) {

	const {
		attributes,
		setAttributes,
		setStoryLinesTitleBackgroundColor,
		setStoryLinesMainBackgroundColor,
		setStoryLinesTitleColor,
		setStoryLinesMainColor,
		storyLinesMainBackgroundColor,
		storyLinesTitleBackgroundColor,
		storyLinesTitleColor,
		storyLinesMainColor,
	} = props;

	const {
		storyLinesMainBackgroundColorValue,
		storyLinesTitleBackgroundColorValue,
		storyLinesTitleColorValue,
		storyLinesMainColorValue,
	} = attributes;
	const { gradientClass, gradientValue, setGradient } = useGradient();

	const handleAddLocation = () => {
		const story_lines_highlights = [ ...props.attributes.story_lines_highlights ];
		story_lines_highlights.push( {
			text: '',
			target: '',
		} );
		props.setAttributes( { story_lines_highlights } );
	};

	const handleRemoveLocation = ( index ) => {
		const story_lines_highlights = [ ...props.attributes.story_lines_highlights ];
		story_lines_highlights.splice( index, 1 );
		props.setAttributes( { story_lines_highlights } );
	};

	const handleTextChange = ( text, index ) => {
		const story_lines_highlights = [ ...props.attributes.story_lines_highlights ];
		story_lines_highlights[ index ].text = text;
		props.setAttributes( { story_lines_highlights } );
	};

	const handleTargetChange = ( target, index ) => {
		const story_lines_highlights = [ ...props.attributes.story_lines_highlights ];
		story_lines_highlights[ index ].target = target;
		props.setAttributes( { story_lines_highlights } );
	};

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

	let highlightFields,
		highlightDisplay;

	console.log(props.attributes.story_lines_title_background);

	if ( props.attributes.story_lines_highlights.length ) {
		console.log( 'here' );
		highlightFields = props.attributes.story_lines_highlights.map( ( location, index ) => {
			return <div key={ index }>
				<TextControl
					className="grf__location-address"
					placeholder=""
					label="Link Text"
					value={ props.attributes.story_lines_highlights[ index ].text }
					onChange={ ( text ) => handleTextChange( text, index ) }
				/>
				<TextControl
					className="grf__location-address"
					placeholder=""
					label="Link Target"
					value={ props.attributes.story_lines_highlights[ index ].target }
					onChange={ ( target ) => handleTargetChange( target, index ) }
				/>
				<IconButton
					className="grf__remove-location-address"
					icon="no-alt"
					label="Delete location"
					onClick={ () => handleRemoveLocation( index ) }
				/>
			</div>;
		} );

		highlightDisplay = props.attributes.story_lines_highlights.map( ( highlight, index ) => {
			return <li key={ index } style={liStyle}><a href={ '#' + highlight.target } style={liStyle}>{ highlight.text }</a></li>;
		} );
	}

	console.log(highlightDisplay);

	return [
		<InspectorControls>
			<PanelBody title={ __( 'Highlights Title' ) }>
				<TextControl
					placeholder=""
					value={ props.attributes.story_lines_title }
					onChange={ ( titleValue ) => props.setAttributes( { story_lines_title: titleValue } ) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Highlights' ) }>
				{ highlightFields }
				<Button
					onClick={ handleAddLocation.bind( this ) }
				>
					{ __( 'Add Highlight' ) }
				</Button>
			</PanelBody>
			<PanelColorGradientSettings
				className="outermost-icon-block__color-settings"
				title={ __( 'Color' ) }
				initialOpen={ true }
				enableAlpha={ true }
				settings={ [
					{
						colorValue: storyLinesTitleBackgroundColor.color || storyLinesTitleBackgroundColorValue,
						onColorChange: ( colorValue ) => {
							setStoryLinesTitleBackgroundColor( colorValue );
							setAttributes( {
								storyLinesTitleBackgroundColorValue: colorValue,
							} );
						},
						gradientValue,
						onGradientChange: setGradient,
						label: __( 'Title Background Color', 'icon-block' ),
					},
					{
						colorValue:
							storyLinesMainBackgroundColor.color ||
							storyLinesMainBackgroundColorValue,
						onColorChange: ( colorValue ) => {
							setStoryLinesMainBackgroundColor( colorValue );
							setAttributes( {
								storyLinesMainBackgroundColorValue: colorValue,
							} );
						},
						label: __( 'Section Background Color', 'icon-block' ),
					},
					{
						colorValue: storyLinesTitleColor.color || storyLinesTitleColorValue,
						onColorChange: ( colorValue ) => {
							setStoryLinesTitleColor( colorValue );
							setAttributes( {
								storyLinesTitleColorValue: colorValue,
							} );
						},
						gradientValue,
						onGradientChange: setGradient,
						label: __( 'Title Color', 'icon-block' ),
					},
					{
						colorValue:
							storyLinesMainColor.color ||
							storyLinesMainColorValue,
						onColorChange: ( colorValue ) => {
							setStoryLinesMainColor( colorValue );
							setAttributes( {
								storyLinesMainColorValue: colorValue,
							} );
						},
						label: __( 'Text Color', 'icon-block' ),
					},
				] }
				__experimentalHasMultipleOrigins={ true }
			>
			</PanelColorGradientSettings>
		</InspectorControls>,
		<div { ...useBlockProps() } style={divStyle}>
			<h2 style={h2Style}>{ props.attributes.story_lines_title }</h2>
			<ul>
				{ highlightDisplay }
			</ul>
		</div>
	];
}

const storyLinesColorAttributes = {
	storyLinesTitleBackgroundColor: 'story-lines-title-background-color',
	storyLinesMainBackgroundColor: 'story-lines-main-background-color',
	storyLinesTitleColor: 'story-lines-title-color',
	storyLinesMainColor: 'story-lines-main-color',
};

export default withColors( storyLinesColorAttributes )( Edit );
