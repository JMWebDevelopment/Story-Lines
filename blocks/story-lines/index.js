/**
 * Block dependencies
 */
//import './style.scss';
//import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    PanelColor,
    InspectorControls,
    URLInput,
    PanelColorSettings
} = wp.editor;// Import registerBlockType() from wp.blocks
const { registerBlockType } = wp.blocks;
const {
    ColorPalette,
    PanelBody,
    TextControl,
    SelectControl,
    Button,
    IconButton,
} = wp.components;
const {
    Fragment,
} = wp.element;

//this is where block control componants go! a-ha!

registerBlockType(
    'story-lines/story-lines', {
        title: __('Story Lines'),
        icon: 'dashicons-megaphone',
        category: 'widgets',
        keywords: [ __( 'story' ), __( 'description' ), __( 'highlights' ) ],

        attributes: {
            story_lines_title: {
                type: 'string',
                default: 'Story Lines',
            },
            story_lines_title_background: {
                type: 'string',
                default: '#000000',
            },
            story_lines_main_background: {
                type: 'string',
                default: '#252525',
            },
            story_lines_title_color: {
                type: 'string',
                default: '#FFFFFF',
            },
            story_lines_main_color: {
                type: 'string',
                default: '#FFFFFF',
            },
            story_lines_highlights: {
                type: 'array',
                default: [],
            },
        },

        getEditWrapperProps( { blockAlignment } ) {
            if ( 'full' === blockAlignment || 'wide' === blockAlignment ) {
                return { 'data-align': blockAlignment };
            }
        },

        edit( { attributes, setAttributes, focus, setFocus, className } ) {
            const { story_lines_title, story_lines_title_background, story_lines_main_background, story_lines_title_color, story_lines_main_color, story_lines_highlights  } = attributes;

            const handleAddLocation = () => {
                const highlights = [ story_lines_highlights ];
                highlights.push( {
                    anchor: '',
                    text: ''
                } );
                setAttributes( { story_lines_highlights: highlights } );
            };

            const handleRemoveLocation = ( index ) => {
                const highlights = [ story_lines_highlights ];
                highlights.splice( index, 1 );
                setAttributes( { story_lines_highlights: highlights } );
            };

            const handleTextChange = ( text, index ) => {
                const highlights = [ story_lines_highlights ];
                highlights[ index ].text = text;
                setAttributes( { story_lines_highlights: highlights } );
            };

            const handleAnchorChange = ( anchor, index ) => {
                const highlights = [ story_lines_highlights ];
                highlights[ index ].anchor = anchor;
                setAttributes( { story_lines_highlights: highlights } );
            };

            let highlightsFields;

            if ( story_lines_highlights.length ) {
                highlightsFields = story_lines_highlights.map( ( location, index ) => {
                    return <Fragment key={ index }>
                        <TextControl
                            className="grf__location-address"
                            placeholder="Story Highlight"
                            value={ story_lines_highlights[ index ].text }
                            onChange={ ( text ) => handleTextChange( text, index ) }
                        />
                        <URLInput
                            className={ className }
                            value={ story_lines_highlights[ index ].anchor }
                            onChange={ ( anchor ) => handleAnchorChange( anchor, index ) }
                        />
                        <IconButton
                            className="grf__remove-location-address"
                            icon="no-alt"
                            label="Delete location"
                            onClick={ () => handleRemoveLocation( index ) }
                        />
                    </Fragment>;
                } );

            }

            return [
                <InspectorControls key="inspector">
                    <PanelColorSettings
                        title={ __( 'Title Background Color', 'atomic-blocks' ) }
                        initialOpen={ false }
                        colorSettings={ [ {
                            value: story_lines_title_background,
                            onChange: story_lines_title_background,
                            label: __( 'Title Background Color', 'atomic-blocks' ),
                        } ] }
                    >
                    </PanelColorSettings>
                    <PanelColorSettings
                        title={ __( 'Section Background Color', 'atomic-blocks' ) }
                        initialOpen={ false }
                        colorSettings={ [ {
                            value: story_lines_main_background,
                            onChange: story_lines_main_background,
                            label: __( 'Title Background Color', 'atomic-blocks' ),
                        } ] }
                    >
                    </PanelColorSettings>
                    <PanelColorSettings
                        title={ __( 'Title Color', 'atomic-blocks' ) }
                        initialOpen={ false }
                        colorSettings={ [ {
                            value: story_lines_title_color,
                            onChange: story_lines_title_color,
                            label: __( 'Title Color', 'atomic-blocks' ),
                        } ] }
                    >
                    </PanelColorSettings>
                    <PanelColorSettings
                        title={ __( 'Text Color', 'atomic-blocks' ) }
                        initialOpen={ false }
                        colorSettings={ [ {
                            value: story_lines_main_color,
                            onChange: story_lines_main_color,
                            label: __( 'Text Color', 'atomic-blocks' ),
                        } ] }
                    >
                    </PanelColorSettings>
                </InspectorControls>,
                <div className={className}>
                    <TextControl
                        className="grf__location-address"
                        placeholder="350 Fifth Avenue New York NY"
                        value={ story_lines_title }
                        onChange={ ( story_lines_title ) => setAttributes( story_lines_title ) }
                    />
                    { highlightsFields }
                    <Button
                        isDefault
                        onClick={ handleAddLocation.bind( this ) }
                    >
                        { __( 'Add Highlight' ) }
                    </Button>
                </div>
            ];
        },

        save( { attributes, setAttributes, focus, setFocus, className } ) {
            const { story_lines_title, story_lines_title_background, story_lines_main_background, story_lines_title_color, story_lines_main_color, story_lines_highlights  } = attributes;

            const highlights = story_lines_highlights.map( ( highlight, index ) => {
                return <li key={ index }><a href={ '#' + highlight.anchor }>{ highlight.text }</a></li>;
            } );

            return (
                <div className={ props.className }>
                    <h2>{ story_lines_title }</h2>
                    <ul>
                        { highlights }
                    </ul>
                </div>
            );
        },
    }
);