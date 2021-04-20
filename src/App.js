import './App.css';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Posts from './components/Posts/Posts';
import {Switch, Route} from 'react-router-dom';
function App() {
  return (
	  <div>
	  	<Navbar />
			<Switch>
				<Route path="/" exact >
					<div className="landing__container">
						<Landing />
					</div>
				</Route>
				<Route path="/posts/:id" exact >
					<div className="App">
						<Posts />
					</div>
				</Route>
			</Switch>
   		</div>
  );
}

export default App;
