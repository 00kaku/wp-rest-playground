import React, { useState } from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';
import Error from '../Error/Error';
import './Login.css';

const Login = ( { setLoggedIn, setUser } ) => {
	const [ username, setUsername ] = useState( '' );
	const [ password, setPassword ] = useState( '' );
	const [ redirect, setRedirect ] = useState( false );
	const [ error, setError ] = useState( '' );
	const [ failed, setFailed ] = useState( '' );
	const formSubmit = ( e ) => {
		e.preventDefault();

		const loginData = {
			username,
			password,
		};

		axios
			.post( `/wp-json/jwt-auth/v1/token`, loginData )
			.then( ( res ) => {
				if ( undefined === res.data.token ) {
					setError( res.data.message );
					return;
				}

				localStorage.setItem( 'user', JSON.stringify( res.data ) );

				setLoggedIn( true );
				setUser( res.data );
				setRedirect( true );
			} )
			.catch( ( err ) => {
				if ( err.response.data.data.status === 403 ) {
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
