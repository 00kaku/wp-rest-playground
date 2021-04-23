import './Comments.css';
import Error from '../Error/Error';
const Comments = ( { comments } ) => {
	return (
		<div>
			{ comments === '' ? (
				<Error />
			) : (
				comments.map( ( comment ) => {
					return (
						<div className="comment" key={ comment.id }>
							<div className="comment_header">
								<img
									src={ comment.author_avatar_urls[ '24' ] }
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
	);
};
export default Comments;
