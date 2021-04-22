import { Link } from 'react-router-dom';
const NomatchMessage = ( { message, isLoading, title } ) => {
	return (
		<div className="nomatch">
			<div className="nomatch__inner">
				{ isLoading ? (
					<h1>
						LOADING
						<span className="fa fa-cog fa-spin"></span>
					</h1>
				) : (
					<>
						<h1>
							{ title || 'Oops' }
							<i className="fa fa-exclamation"></i>
						</h1>
						<p>{ message }</p>
						<Link to="/" className="nomatch__button">
							Go Home
						</Link>
					</>
				) }
			</div>
		</div>
	);
};
export default NomatchMessage;
