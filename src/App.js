import './App.css';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import PostsCategory from './containers/PostsCategory/PostsCategory';
import PostsSearch from './containers/PostsSearch/PostsSearch';
import Nomatch from './components/Nomatch/Nomatch';
import Post from './components/Post/Post';

import { Switch, Route } from 'react-router-dom';
function App() {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path="/" exact>
					<div className="landing__container">
						<Landing />
					</div>
				</Route>
				<Route path="/posts/:category" exact>
					<div className="App">
						<PostsCategory />
					</div>
				</Route>
				<Route path="/search">
					<div className="App">
						<PostsSearch />
					</div>
				</Route>
				<Route path="*/post/:id">
					<div className="App">
						<Post />
					</div>
				</Route>
				<Route path="*">
					<Nomatch />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
