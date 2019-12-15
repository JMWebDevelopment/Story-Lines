import './editor.scss';
import './style.scss';

const {
    __,
} = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    Button,
    IconButton,
    PanelBody,
    TextControl,
    ColorPalette,
    SelectControl
} = wp.components;
const {
    PanelColor,
    InspectorControls,
    URLInput,
    PanelColorSettings,
    AlignmentToolbar,
    BlockControls,
} = wp.editor;
const {
    Fragment,
} = wp.element;

/**
 * Register: Repeater Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'story-lines/story-lines', {
    title: __( 'Story Lines' ),
    icon: 'shield',
    category: 'common',
    attributes: {
        story_lines_highlights: {
            type: 'array',
            default: [],
        },
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
        blockAlignment: {
            type: 'string',
            default: 'none'
        }
    },
    keywords: [
        __( 'story' ),
        __( 'description' ),
        __( 'highlights' ),
    ],
    edit: ( props ) => {
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

        if ( props.attributes.story_lines_highlights.length ) {
            highlightFields = props.attributes.story_lines_highlights.map( ( location, index ) => {
                return <Fragment key={ index }>
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
                </Fragment>;
            } );

            highlightDisplay = props.attributes.story_lines_highlights.map( ( highlight, index ) => {
                return <li key={ index } style={liStyle}><a href={ '#' + highlight.target } style={liStyle}>{ highlight.text }</a></li>;
            } );
        }

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
                        isDefault
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
            <div key="2" className={ props.className } style={divStyle}>
                <h2 style={h2Style}>Block</h2>
                <ul>
                    { highlightDisplay }
                </ul>
            </div>,
        ];
    },
    save: ( props ) => {

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
            <div className={ props.className } style={divStyle}>
                <h2 style={h2Style}>Block</h2>
                <ul>
                    { highlightDisplay }
                </ul>
            </div>
        );
    },
} );

