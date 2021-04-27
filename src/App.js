import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import PostsCategory from './containers/PostsCategory/PostsCategory';
import PostsSearch from './containers/PostsSearch/PostsSearch';
import Nomatch from './components/Nomatch/Nomatch';
import Post from './components/Post/Post';
import Login from './components/Login/Login';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import AuthReducer from './reducers/AuthReducer';
const initialState = {
	loggedIn: localStorage.getItem( 'loggedIn' ) ? true : false,
	user: JSON.parse( localStorage.getItem( 'user' ) ) || '',
};
/**
 * The top component that decides the structure of the whole application based on where user wants to go.
 *
 * @return {React.Component} Return the main app component with inner components switching based on route the user is at.
 */
function App() {
	const [ state, dispatch ] = React.useReducer( AuthReducer, initialState );
	return (
		<AuthContext.Provider value={ { state, dispatch } }>
			<div>
				<Navbar />
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

					<Route path="*/post/:id" render={ () => <Post /> } />

					<Route path="/login" render={ () => <Login /> } />

					<Route path="*" component={ Nomatch } />
				</Switch>
			</div>
		</AuthContext.Provider>
	);
}

export default App;
