import { useState } from 'react';
import './Comments.css';
import Error from '../Error/Error';
import GoBackButton from '../GoBackButton/GoBackButton';
import NomatchMessage from '../NomatchMessage/NomatchMessage';
import axios from '../../axios';
const Comments = ( { comments, setShowComments, user } ) => {
	const [ commentsLocal ] = useState( comments );
	const [ postComment, setComment ] = useState( '' );
	const [ success, setSuccess ] = useState( false );
	const [ failed, setFailed ] = useState( false );
	const id = window.location.pathname.split( '/' ).pop();
	const postComments = ( event ) => {
		event.preventDefault();
		setSuccess( false );
		setFailed( false );

		if ( postComment ) {
			axios
				.post(
					`/wp-json/wp/v2/comments`,
					{
						author_email: user.user_email,
						author_name: user.user_display_name,
						content: postComment.replace( /(<([^>]+)>)/gi, '' ),
						post: id,
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${ user.token }`,
						},
					}
				)
				.then( ( res ) => {
					setSuccess( true );
					setComment( '' );
				} )
				.catch( ( err ) => setFailed( true ) );
		}
	};
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
						commentsLocal?.map( ( comment ) => {
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
					{ user ? (
						<div className="add__comments__container">
							<textarea
								placeholder="Enter comment...."
								rows="10"
								cols="50"
								value={ postComment }
								onChange={ ( event ) =>
									setComment( event.target.value )
								}
							></textarea>
							<button onClick={ postComments }>Post</button>
						</div>
					) : (
						<NomatchMessage
							title="Login to post commnets"
							message=" "
						/>
					) }
					{ success && (
						<div className="comment__success">
							Your comment has been posted. It will be shown once
							approved.
							<i
								className="fa fa-window-close"
								onClick={ () => setSuccess( false ) }
								role="button"
								tabIndex={ 0 }
								onKeyDown={ ( event ) =>
									event.keyCode === 'Enter' &&
									setSuccess( true )
								}
							></i>
						</div>
					) }
					{ failed && (
						<NomatchMessage message="Something went wrong with api fetch. Please try again after some time. " />
					) }
				</div>
			</div>
		</div>
	);
};
export default Comments;
