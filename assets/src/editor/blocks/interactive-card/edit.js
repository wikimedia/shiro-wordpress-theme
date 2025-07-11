import { BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { Toolbar, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { controls, headingIcons } from './helpers';

/**
 * @param {object} props Block properties.
 *
 * @returns {WPElement} Interactive Card block edit component.
 */
const Edit = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		headingTag,
		headingText,
		subHeadingText
	} = attributes;

	const blockProps = useBlockProps();

	return (
		<>
			<BlockControls>
				<Toolbar
					style={ {
						border: 'none',
						borderRight: '1px solid',
						padding: '0'
					} }
				>
					<ToolbarGroup
						label={ __( 'Change heading level', 'shiro-admin' ) }
						icon={ headingIcons[ headingTag ] || headingLevel2 }
						isCollapsed={ true }
						controls={ controls.map( tag => {
							return {
								title: tag.label,
								icon: headingIcons[ tag.tag ],
								isActive: headingTag === tag.tag,
								onClick: () => {
									setAttributes( { headingTag: tag.tag } );
								},
							}
						} ) }
					/>
				</Toolbar>
			</BlockControls>

			<div { ...blockProps }>
				<div className="interactive-card__content">
					<RichText
						allowedFormats={ [ 'core/link' ] }
						className="interactive-card__heading"
						placeholder={ __( 'Heading', 'shiro-admin' ) }
						tagName={ headingTag }
						value={ headingText }
						onChange={ ( value ) => {
							setAttributes( { headingText: value } );
						} }
					/>

					<div className="interactive-card__subheading">
						<RichText
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
							placeholder={ __( 'Subheading content...', 'shiro-admin' ) }
							tagName='p'
							value={ subHeadingText }
							onChange={ ( value ) => {
								setAttributes( { subHeadingText: value } );
							} }
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
