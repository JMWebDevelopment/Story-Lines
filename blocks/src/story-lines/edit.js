import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
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
	Fragment
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
export default function Edit( props ) {

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

	console.log(props.attributes.story_lines_highlights.length);

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
		<InspectorControls key="1">
			<PanelBody title={ __( 'Highlights Title' ) }>
				<TextControl
					placeholder=""
					value={ props.attributes.story_lines_title }
					onChange={ ( story_lines_title ) => props.setAttributes( story_lines_title ) }
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
			<PanelColorSettings
					title={ __( 'Title Background Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: props.attributes.story_lines_title_background,
						onChange: ( colorValue ) => props.setAttributes( { story_lines_title_background: colorValue } ),
						label: __( 'Title Background Color', 'atomic-blocks' ),
					} ] }
				>
				</PanelColorSettings>
				<PanelColorSettings
					title={ __( 'Section Background Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: props.attributes.story_lines_main_background,
						onChange: ( colorValue ) => props.setAttributes( { story_lines_main_background: colorValue } ),
						label: __( 'Title Background Color', 'atomic-blocks' ),
					} ] }
				>
				</PanelColorSettings>
				<PanelColorSettings
					title={ __( 'Title Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: props.attributes.story_lines_title_color,
						onChange: ( colorValue ) => props.setAttributes( { story_lines_title_color: colorValue } ),
						label: __( 'Title Color', 'atomic-blocks' ),
					} ] }
				>
				</PanelColorSettings>
				<PanelColorSettings
					title={ __( 'Text Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: props.attributes.story_lines_main_color,
						onChange: ( colorValue ) => props.setAttributes( { story_lines_main_color: colorValue } ),
						label: __( 'Text Color', 'atomic-blocks' ),
					} ] }
				>
				</PanelColorSettings>
		</InspectorControls>,
		<div { ...useBlockProps() } style={divStyle}>
			<h2 style={h2Style}>{ props.attributes.story_lines_title }</h2>
			<ul>
				{ highlightDisplay }
			</ul>
		</div>
	];
}
