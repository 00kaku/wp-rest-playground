import React, { useState } from 'react';
import { login } from '../../api/api';
import { Redirect } from 'react-router-dom';
import Error from '../Error/Error';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext';
/**
 * The componenet to implement the login functionality for the appplication.
 *
 * @return {React.Component} Return the Login component.
 */
const Login = () => {
	const [ username, setUsername ] = useState( '' );
	const [ password, setPassword ] = useState( '' );
	const [ redirect, setRedirect ] = useState( false );
	const [ error, setError ] = useState( '' );
	const [ failed, setFailed ] = useState( '' );
	const { dispatch } = React.useContext( AuthContext );
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
		login( loginData, dispatch, setError, setFailed, setRedirect );
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
