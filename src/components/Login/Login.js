import { useState } from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';

const Login = () => {
	const [ username, setUsername ] = useState( '' );
	const [ password, setPassword ] = useState( '' );
	const [ loggedIn, setLoggedIn ] = useState( false );
	const [error, setError ] = useState( '' );

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

				localStorage.setItem( 'token', res.data.token );
				localStorage.setItem( 'userName', res.data.user_nicename );

				setLoggedIn( true );
			} )
			.catch( ( err ) => {
				setError( err.response.data.message );
			} );
	};

	if ( loggedIn || localStorage.getItem( 'token' ) ) {
		return <Redirect to={ `/` } noThrow />;
	}
	return (
		<div>
			<div className="login__container">
				<form onSubmit={ formSubmit }>
					<label htmlFor="username">
						Username:
						<input
							type="text"
							value={ username }
							onChange={ ( e ) => setUsername( e.target.value ) }
							id="username"
						/>
					</label>
					<br />
					<label htmlFor="password">
						Pasword:
						<input
							type="password"
							className="form-control"
							value={ password }
							onChange={ ( e ) => setPassword( e.target.value ) }
						/>
					</label>
					<br />
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
