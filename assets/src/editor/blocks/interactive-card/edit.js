import { BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { Toolbar, ToolbarGroup } from '@wordpress/components';
import {
	headingLevel2,
	headingLevel3,
	headingLevel4,
	headingLevel5,
	headingLevel6
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * @param {object} props Block properties.
 *
 * @returns {WPElement} Hero edit block component.
 */
const Edit = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		headingTag,
		headingText,
		subHeadingText
	} = attributes;
	const blockProps = useBlockProps();

	const activeIcon = headingTag => {
		let icon;

		switch ( headingTag ) {
			case 'h2':
				icon = headingLevel2;
				break;
			case 'h3':
				icon = headingLevel3;
				break;
			case 'h4':
				icon = headingLevel4;
				break;
			case 'h5':
				icon = headingLevel5;
				break;
			case 'h6':
				icon = headingLevel6;
				break;
			default:
				icon = headingLevel2;
		}

		return icon;
	};

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
						icon={ activeIcon( headingTag ) }
						isCollapsed={ true }
						controls={ [
							{
								tag: 'h2',
								icon: headingLevel2,
								label: __( 'Heading 2', 'shiro-admin' ),
							},
							{
								tag: 'h3',
								icon: headingLevel3,
								label: __( 'Heading 3', 'shiro-admin' ),
							},
							{
								tag: 'h4',
								icon: headingLevel4,
								label: __( 'Heading 4', 'shiro-admin' ),
							},
							{
								tag: 'h5',
								icon: headingLevel5,
								label: __( 'Heading 5', 'shiro-admin' ),
							},
							{
								tag: 'h6',
								icon: headingLevel6,
								label: __( 'Heading 6', 'shiro-admin' ),
							}
						].map( tag => {
							return {
								title: tag.label,
								icon: tag.icon,
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
				<div>
					<RichText
						allowedFormats={ [ 'core/link' ] }
						className="interactive-card-heading"
						placeholder={ __( 'Heading', 'shiro-admin' ) }
						tagName={ headingTag }
						value={ headingText }
						onChange={ ( value ) => {
							setAttributes( { headingText: value } );
						} }
					/>

					<RichText
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						className="interactive-card-subheading"
						placeholder={ __( 'Subheading content...', 'shiro-admin' ) }
						tagName='p'
						value={ subHeadingText }
						onChange={ ( value ) => {
							setAttributes( { subHeadingText: value } );
						} }
					/>
				</div>
			</div>
		</>
	);
};

export default Edit;
