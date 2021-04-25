import React from 'react';
import NomatchMessage from '../NomatchMessage/NomatchMessage';
/**
 * Generic function that will return a component when an error occurs in the application.
 *
 * @return {React.Component} Return the Error component.
 */
const Error = () => {
	return (
		<NomatchMessage
			message={
				'Something went wrong with the api fetch. Try again after some time.'
			}
			isLoading={ false }
		/>
	);
};

export default Error;
