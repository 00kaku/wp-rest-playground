import React from 'react';
import { Link } from 'react-router-dom';
/**
 * The component for the Nomatch message.\
 *
 * @param {Object} props Component props.
 * @param {string} props.message The message to dsiplay.
 * @param {string} props.title The title to display.
 * @param {boolean} props.isLoading The bit to check if the process that will possibly generate the nomatch message is in loading or loaded.
 * @return {React.Component} Return the NomatchMessage component.
 */
const NomatchMessage = ( { message, isLoading, title } ) => {
	return (
		<div className="nomatch">
			<div className="nomatch__inner">
				{ isLoading ? (
					<h1>
						LOADING
						<span className="fa fa-cog fa-spin"></span>
					</h1>
				) : (
					<>
						<h1>
							{ title || 'Oops' }
							<i className="fa fa-exclamation"></i>
						</h1>
						<p>{ message }</p>
						<Link to="/" className="nomatch__button">
							Go Home
						</Link>
					</>
				) }
			</div>
		</div>
	);
};
export default NomatchMessage;
