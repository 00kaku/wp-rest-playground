import React, { useState, useEffect } from 'react';
import { getNav } from '../../api/api';
import './Navbar.css';
import { AuthContext } from '../../contexts/AuthContext';

/**
 * The comonent for the navigation bar of the application.
 *
 * @return {React.Component} Returns the Navbar component.
 */
const Navbar = () => {
	const [ nav, setNav ] = useState( '' );
	const { state, dispatch } = React.useContext( AuthContext );
	useEffect( () => {
		getNav( setNav );
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
		dispatch( {
			type: 'LOGOUT',
		} );
	};

	return (
		<div className="nav-main">
			{ state.loggedIn && state.user ? (
				<div className="user-nav">
					<span className="user__diaplay__icon">
						{ state.user?.user_display_name.substr( 0, 1 ) }
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
