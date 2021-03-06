import React, { useState } from 'react';
import './Landing.css';
import { Redirect, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
/**
 * The component for main landing page of the application.
 *
 * @return {React.Component} Return the landing page component.
 */
const Landing = () => {
	const [ term, setTerm ] = useState( '' );
	const [ redirect, setRedirect ] = useState( false );
	const { state } = React.useContext( AuthContext );
	/**
	 * The function to search any term in the posts.
	 *
	 * @return {undefined}
	 */
	const search = () => {
		if ( term ) {
			localStorage.setItem( 'term', term );
			setRedirect( true );
		}
	};

	if ( redirect ) {
		return <Redirect to="/search" />;
	}

	return (
		<div className="Landing">
			<h1> A FUN FICTIONAL CHARACTER INFO WEBSITE </h1>
			<h2>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
				imperdiet turpis vitae velit condimentum, et vehicula ex
				bibendum. Sed cursus nisl ac bibendum semper. Vestibulum nisl
				lacus, consequat semper semper ac, commodo nec lectus.
			</h2>
			<div className="search__input">
				<input
					type="text"
					placeholder="Search for a fictional character...."
					onChange={ ( e ) => setTerm( e.target.value ) }
					onKeyDown={ ( event ) =>
						'Enter' === event.key ? search() : null
					}
				/>
				<span>
					<i
						className="fa fa-search"
						onClick={ search }
						role="button"
						tabIndex={ 0 }
						onKeyDown={ ( event ) =>
							'Enter' === event.key ? search() : null
						}
					/>
				</span>
			</div>
			{ state.user ? (
				''
			) : (
				<Link to="/login" className="login__button">
					<button>Login</button>
				</Link>
			) }
		</div>
	);
};

export default Landing;
