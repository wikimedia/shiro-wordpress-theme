import classNames from 'classnames';
import React from 'react';

import { InspectorControls, RichText } from '@wordpress/block-editor';
import { withFocusOutside, Panel, PanelRow, PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './style.scss';
import URLPicker from '../url-picker';

/**
 * The props object for the CTA Content (save) component.
 *
 * @typedef {object} CtaContentProps
 *
 * @property {string}  url          CTA target link
 * @property {string}  text         CTA label text.
 * @property {string}  className    CTA element class name.
 * @property {boolean} openInNewTab Whether to open target link in new tab.
 */

/**
 * Edit-specific component properties for the CTA Edit component.
 *
 * @typedef {object} CtaEditChangeHandlers
 *
 * @property {(url: string) => void}        onChangeLink         Change handler for link URL.
 * @property {(text: string) => void}       onChangeText         Change handler for link text.
 * @property {(openInNewTab: bool) => void} onChangeOpenInNewTab Change handler for link target behavior.
 */

/**
 * React props object for the CTA edit component.
 *
 * @typedef {CtaEditChangeHandlers & CtaContentProps} CtaEditProps;
 */


/**
 * Render a component that can be used to set the URL and text for a CTA.
 *
 * The arguments `onChangeText` and `onChangeLink` are used to set attributes
 * when the respective items change. `onChangeText` will receive `text` and
 * `onChangeLink` will receive `url` (and a second parameter which contains
 * additional data if the selected link is an internal resource, like 'ID',
 * 'title', and 'postType'). Keep in mind that sometimes `onChangeLink` will
 * receive `undefined` which is an expected value: This is how the "remove
 * link" functionality works.
 *
 * `withFocusOutside()` is necessary here (paired with the `onFocus` attribute)
 * in order to show & hide the button on the toolbar when the CTA is focused
 * in the editor (or not).
 */
const CtaWithFocusOutside = withFocusOutside(
	class extends React.Component {
		constructor( props ) {
			super( props );
			this.state = {
				showButtons: false,
			};
		}

		handleFocusOutside() {
			this.setState( { showButtons: false } );
		}

		render() {
			const { showButtons } = this.state;
			/** @type CtaEditProps */
			const {
				text,
				onChangeText,
				onChangeLink,
				onChangeOpenInNewTab,
				openInNewTab,
				className,
				url,
			} = this.props;

			return (
				<>
					<URLPicker
						isSelected={ showButtons }
						url={ url }
						onChangeLink={ onChangeLink }
					/>
					{ ! ! onChangeOpenInNewTab && (
						<InspectorControls>
							<Panel>
								<PanelBody title={ __( 'CTA link behavior', 'shiro-admin' ) } initialOpen>
									<ToggleControl
										label={ __( 'Open in new tab', 'shiro-admin' ) }
										checked={ openInNewTab }
										onChange={ onChangeOpenInNewTab }
									/>
								</PanelBody>
							</Panel>
						</InspectorControls>
					) }
					<div className={
						classNames(
							'call-to-action-wrapper',
							{ 'call-to-action--no-url': ! url }
						)
					}>
						<RichText
							// For some reason withoutInteractiveFormatting doesn't
							// work here, but this does.
							allowedFormats={ [] }
							className={
								classNames(
									'call-to-action',
									className
								)
							}
							placeholder={ __( 'Call to action', 'shiro-admin' ) }
							tagName="div"
							onFocus={ () => this.setState( { showButtons: true } ) }
							value={ text }
							onChange={ onChangeText }
						/>
						{ ! url && <div className={ 'call-to-action__warning' }>
							<span aria-label={ __( 'Warning', 'shiro-admin' ) } role={ 'img' }>⚠️</span>
						&nbsp;
							<span>{ __( 'Add a URL to this CTA', 'shiro-admin' ) }</span>
						</div> }
					</div>
				</>
			);
		}
	}
);

/**
 * Provide a ready-made element for `save()`.
 *
 * @param {CtaContentProps} props React component props.
 */
CtaWithFocusOutside.Content = ( { url, text, className, openInNewTab = false, ...props } ) => {
	if ( ! url ) {
		return null;
	}

	const linkTargetProps = {};
	if ( openInNewTab ) {
		linkTargetProps.target = "_blank";
		linkTargetProps.rel = "noreferrer noopener";
	}

	return (
		<a
			className={ className }
			href={ url }
			{ ...props }
			{ ...linkTargetProps }
		>
			{ text }
		</a>
	);
};

export default CtaWithFocusOutside;
