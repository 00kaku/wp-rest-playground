import { useState, useEffect } from 'react';
import axios from '../../axios';
import NomatchMessage from '../NomatchMessage/NomatchMessage';
import Comments from '../Comments/Comments';
import GoBackButton from '../GoBackButton/GoBackButton';
import Error from '../Error/Error';
import './Post.css';

const Post = () => {
	const [ post, setPost ] = useState( null );
	const [ isLoading, setLoading ] = useState( true );
	const [ comments, setComments ] = useState( [] );
	const [ showComments, setShowComments ] = useState( false );
	const [ error, setError ] = useState();
	useEffect( () => {
		const id = window.location.pathname.split( '/' ).pop();

		axios
			.get( `/wp-json/wp/v2/posts?_embed&include=${ id }` )
			.then( ( res ) => {
				setPost( res.data[ 0 ] );
				setLoading( false );
			} )
			.catch( ( err ) => setError( err ) );

		axios
			.get( `/wp-json/wp/v2/comments?post=${ id }` )
			.then( ( res ) => setComments( res.data ) )
			.catch( ( err ) => setComments( null ) );
	}, [] );

	const postData =
		post === undefined || post === null ? (
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
					src={
						post?._embedded[ 'wp:featuredmedia' ][ 0 ]?.source_url
					}
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

	return (
		<div className="post__container">
			{ showComments ? (
				<div className="comments__container">
					<span
						onClick={ () => setShowComments( false ) }
						onKeyDown={ ( event ) =>
							event.key === 'Enter'
								? setShowComments( false )
								: null
						}
						role="button"
						tabIndex={ 0 }
					>
						<i className="fa fa-arrow-left fa-lg back__button"></i>
					</span>
					<GoBackButton />
					<div className="comments__inner">
						<Comments comments={ comments } />
					</div>
				</div>
			) : (
				( error && <Error /> ) || postData
			) }
		</div>
	);
};
export default Post;
