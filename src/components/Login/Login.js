import React, { useState } from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';
import Error from '../Error/Error';
import './Login.css';
/**
 * The componenet to implement the login functionality for the appplication.
 *
 * @param {Object} props Component props.
 * @param {Function} props.setLoggedIn The function to set the bit loggedIn(defined in App component) to mark that user is logged in.
 * @param {Function} props.setUser The function to set the user object (defined in App component) to be passed to other components.
 * @return {React.Component} Return the Login component.
 */
const Login = ( { setLoggedIn, setUser } ) => {
	const [ username, setUsername ] = useState( '' );
	const [ password, setPassword ] = useState( '' );
	const [ redirect, setRedirect ] = useState( false );
	const [ error, setError ] = useState( '' );
	const [ failed, setFailed ] = useState( '' );
	/**
	 * Function that will hit the JWT authentication api end point to login and return either success or valid error.
	 *
	 * @param {event} e The event object generated on submitting the form.
	 * @return {undefined}
	 */
	const formSubmit = ( e ) => {
		e.preventDefault();

		const loginData = {
			username,
			password,
		};

		axios
			.post( `/wp-json/jwt-auth/v1/token`, loginData )
			.then( ( res ) => {
				if ( ! res.data.token ) {
					setError( res.data.message );
					return;
				}

				localStorage.setItem( 'user', JSON.stringify( res.data ) );

				setLoggedIn( true );
				setUser( res.data );
				setRedirect( true );
			} )
			.catch( ( err ) => {
				if ( 403 === err.response.data.data.status ) {
					setError( err.response.data.message );
				} else {
					setFailed( err );
				}
			} );
	};

	if ( redirect || localStorage.getItem( 'user' ) ) {
		return <Redirect to={ `/` } noThrow />;
	}
	return (
		<div>
			{ failed ? (
				<Error />
			) : (
				<div className="login__container">
					<form onSubmit={ formSubmit }>
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							value={ username }
							onChange={ ( e ) => setUsername( e.target.value ) }
							id="username"
						/>
						<br />
						<label htmlFor="password">Pasword:</label>
						<input
							type="password"
							id="password"
							className="form-control"
							value={ password }
							onChange={ ( e ) => setPassword( e.target.value ) }
						/>
						<br />
						<button type="submit">Login</button>
					</form>
					<div
						dangerouslySetInnerHTML={ { __html: error } }
						className={ `login__error ${ error && 'show' }` }
					></div>
				</div>
			) }
		</div>
	);
};

export default Login;
