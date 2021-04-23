import './Comments.css';
import Error from '../Error/Error';
import GoBackButton from '../GoBackButton/GoBackButton';
const Comments = ( { comments, setShowComments } ) => {
	return (
		<div className="comments__container">
			<span
				onClick={ () => setShowComments( false ) }
				onKeyDown={ ( event ) =>
					event.key === 'Enter' ? setShowComments( false ) : null
				}
				role="button"
				tabIndex={ 0 }
			>
				<i className="fa fa-arrow-left fa-lg back__button"></i>
			</span>
			<GoBackButton />
			<div className="comments__inner">
				<div>
					{ comments === '' ? (
						<Error />
					) : (
						comments.map( ( comment ) => {
							return (
								<div className="comment" key={ comment.id }>
									<div className="comment_header">
										<img
											src={
												comment.author_avatar_urls[
													'24'
												]
											}
											alt={ comment.author_name }
										/>
										<h4>{ comment.author_name }:</h4>
									</div>
									<span
										dangerouslySetInnerHTML={ {
											__html: comment.content.rendered,
										} }
									/>
								</div>
							);
						} )
					) }
				</div>
			</div>
		</div>
	);
};
export default Comments;
