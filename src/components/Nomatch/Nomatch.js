import React from 'react';
import NomatchMessage from '../NomatchMessage/NomatchMessage';
/**
 * The component to show the nomatch message whenever an error is encountered. It is the container for NomatchMessage component.
 *
 * @return {React.Component} Returns the NomatchMessage Component.*/
const Nomatch = () => {
	return (
		<NomatchMessage
			isLoading={ false }
			message={ 'The page you are looking for does not exist.' }
			title="Error 404"
		/>
	);
};
export default Nomatch;
