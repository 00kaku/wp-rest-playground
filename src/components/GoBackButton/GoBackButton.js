import React from 'react';
/**
 * The component for a button to go back to previous page/post.
 *
 * @return {React.Component} Return the GoBackbutton component.
 */
const GoBackButton = () => {
	return (
		<span
			onClick={ () => window.history.back() }
			role="button"
			onKeyDown={ ( event ) =>
				'Enter' === event.key ? window.history.back() : null
			}
			tabIndex={ 0 }
		>
			<i className="fa fa-window-close fa-lg"></i>
		</span>
	);
};

export default GoBackButton;
