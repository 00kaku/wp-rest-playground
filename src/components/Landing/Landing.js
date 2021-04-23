import { useState } from 'react';
import './Landing.css';
import { Redirect, Link } from 'react-router-dom';

const Landing = () => {
	const [ term, setTerm ] = useState( '' );
	const [ redirect, setRedirect ] = useState( false );

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
						event.key === 'Enter' ? search() : null
					}
				/>
				<span>
					<i
						className="fa fa-search"
						onClick={ search }
						role="button"
						tabIndex={ 0 }
						onKeyDown={ ( event ) =>
							event.key === 'Enter' ? search() : null
						}
					/>
				</span>
			</div>
			{ localStorage.getItem( 'token' ) ? (
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
