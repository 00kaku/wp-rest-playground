import NomatchMessage from '../NomatchMessage/NomatchMessage';
import GoBackButton from '../GoBackButton/GoBackButton';
const Postdata = ( { post, isLoading, comments, setShowComments } ) => {
	return post === undefined || post === null ? (
		<NomatchMessage
			message={ 'There is no such post available.' }
			isLoading={ isLoading }
		/>
	) : (
		<div className="post">
			<div className="post__close">
				<GoBackButton />
			</div>
			<img
				src={ post?._embedded[ 'wp:featuredmedia' ][ 0 ]?.source_url }
				alt={ `A poster of ${ post.title }` }
			/>
			<h1>{ post.title.rendered }</h1>
			<div
				dangerouslySetInnerHTML={ {
					__html: post.content.rendered,
				} }
			></div>
			<div className="show__comments__box">
				<p>
					Total Comments:
					{ comments?.length >= 0
						? comments.length
						: 'Unable to fetch comments due to api error.' }
				</p>
				<button
					className="nomatch__button"
					onClick={ () => setShowComments( true ) }
				>
					View comments <i className="fa fa-comment fa-lg"></i>
				</button>
			</div>
		</div>
	);
};

export default Postdata;
