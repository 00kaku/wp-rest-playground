import './App.css';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Posts from './components/Posts/Posts';
import {Switch, Route} from 'react-router-dom';
function App() {
  return (
	  <div>
	  	<Navbar />
    	<div className="App">
			<Switch>
				<Route path="/" exact >
					<Landing />
				</Route>
				<Route path="/posts/:id" exact >
					<Posts />
				</Route>
			</Switch>
   		</div>
	</div>
  );
}

export default App;
