import { useState, useEffect } from 'react';
import axios from '../../axios';
import './Navbar.css';

const Navbar = ( { loggedIn, setLoggedIn, user, setUser } ) => {
	const [ nav, setNav ] = useState( '' );

	useEffect( () => {
		axios
			.get( '/wp-json/wc/v1/nav' )
			.then( ( res ) => setNav( res.data ) )
			.catch( ( err ) => setNav( '<p>Failed to load Nav</p>' ) );
	}, [] );

	const menuToggle = () => {
		'none' === document.getElementById( 'menu-menu' ).style.display
			? ( document.getElementById( 'menu-menu' ).style.display = 'block' )
			: ( document.getElementById( 'menu-menu' ).style.display = 'none' );
	};

	const handleLogout = () => {
		localStorage.removeItem( 'user' );
		setLoggedIn( false );
		setUser( '' );
	};

	return (
		<div className="nav-main">
			<div className="nav-heading">
				{ user && (
					<span className="user__diaplay__icon">
						{ user?.user_display_name.substr( 0, 1 ) }
					</span>
				) }
				<h3>
					<a href="/">WP-REST-PLAYGROUND </a>
				</h3>
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
			<div dangerouslySetInnerHTML={ { __html: nav } }></div>
			{ loggedIn && user ? (
				<div className="user-nav">
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
		</div>
	);
};

export default Navbar;
