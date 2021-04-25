import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './Navbar.css';

/**
 * The comonent for the navigation bar of the application.
 *
 * @param {Object} props Component props.
 * @param {boolean} props.loggedIn The bit (Defined at App component) that will tell if the user is logged in, so that we can show/hide user's navigation.'
 * @param {Function} props.setLoggedIn The function(Defined at App component) to set/unset loggedIn.
 * @param {Object} props.user The object (Defined at App component) that represents the logged in user.
 * @param {Function} props.setUser The function(Defined at App component) to set/unset user.
 * @return {React.Component} Returns the Navbar component.
 */
const Navbar = ( { loggedIn, setLoggedIn, user, setUser } ) => {
	const [ nav, setNav ] = useState( '' );

	useEffect( () => {
		axios
			.get( '/wp-json/wc/v1/nav' )
			.then( ( res ) => setNav( res.data ) )
			.catch( () => setNav( '<p>Failed to load Nav</p>' ) );
	}, [] );

	/**
	 * The function to toggle menu at mobile width to create responsive navbar.
	 *
	 * @return {undefined}
	 */
	const menuToggle = () => {
		'none' === document.getElementById( 'menu-menu-top' ).style.display
			? ( document.getElementById( 'menu-menu-top' ).style.display =
					'block' )
			: ( document.getElementById( 'menu-menu-top' ).style.display =
					'none' );
	};
	/**
	 * The function to log out of the application.
	 *
	 * @return {undefined}
	 */
	const handleLogout = () => {
		localStorage.removeItem( 'user' );
		setLoggedIn( false );
		setUser( '' );
	};

	return (
		<div className="nav-main">
			{ loggedIn && user ? (
				<div className="user-nav">
					<span className="user__diaplay__icon">
						{ user?.user_display_name.substr( 0, 1 ) }
					</span>
					<button
						onClick={ () => handleLogout() }
						onKeyDown={ ( event ) =>
							'Enter' === event.key && handleLogout()
						}
					>
						LOGOUT
					</button>
				</div>
			) : (
				''
			) }
			<div className="nav-heading">
				<h2>
					<a href="/">WP-REST-PLAYGROUND </a>
				</h2>
				<span>
					<i
						className="fas fa-bars icon"
						onClick={ menuToggle }
						onKeyDown={ menuToggle }
						role="button"
						tabIndex={ 0 }
					></i>
				</span>
			</div>
			<div id="menu-menu-top">
				<div dangerouslySetInnerHTML={ { __html: nav } }></div>
			</div>
		</div>
	);
};

export default Navbar;
