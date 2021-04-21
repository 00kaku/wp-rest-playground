import "./Nomatch.css"
import {Link} from 'react-router-dom';

const Nomatch = ()  =>{
	return (
		<div className="nomatch">
			<div className="nomatch__inner">
					<h1>Error 404 <i className="fa fa-exclamation"></i></h1>
					<p>The page you are looking for doesn't exist.</p>
					<Link to="/" className="nomatch__button"> Go Home </Link>
			</div>

		</div>
	)
}
export default Nomatch;
