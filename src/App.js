import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import PostsCategory from './containers/PostsCategory/PostsCategory';
import PostsSearch from './containers/PostsSearch/PostsSearch';
import Nomatch from './components/Nomatch/Nomatch';
import Post from './components/Post/Post';
import Login from './components/Login/Login';

import { Switch, Route } from 'react-router-dom';
function App() {
	const [ loggedIn, setLoggedIn ] = useState(
		localStorage.getItem( 'user' ) ? true : false
	);
	const [ user, setUser ] = useState(
		JSON.parse( localStorage.getItem( 'user' ) ) || ''
	);
	return (
		<div>
			<Navbar
				loggedIn={ loggedIn }
				setLoggedIn={ setLoggedIn }
				user={ user }
				setUser={ setUser }
			/>
			<Switch>
				<Route path="/" exact>
					<div className="landing__container">
						<Landing />
					</div>
				</Route>

				<Route
					path="/posts/:category"
					exact
					component={ PostsCategory }
				/>

				<Route path="/search" component={ PostsSearch } />

				<Route
					path="*/post/:id"
					render={ () => <Post user={ user } /> }
				/>

				<Route
					path="/login"
					render={ () => (
						<Login
							setLoggedIn={ setLoggedIn }
							setUser={ setUser }
						/>
					) }
				/>

				<Route path="*" component={ Nomatch } />
			</Switch>
		</div>
	);
}

export default App;
