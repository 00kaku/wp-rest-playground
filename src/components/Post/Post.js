/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import axios from '../../axios';
import NomatchMessage from '../NomatchMessage/NomatchMessage';
import Comments from '../Comments/Comments';
import './Post.css';

const Post = () => {
	const [ post, setPost ] = useState( null );
	const [ isLoading, setLoading ] = useState( true );
	const [ comments, setComments ] = useState( [] );
	const [ showComments, setShowComments ] = useState( false );

	useEffect( () => {
		const id = window.location.pathname.split( '/' ).pop();
		axios
			.get( `wp/v2/posts?_embed&include=${ id }` )
			.then( ( res ) => {
				setPost( res.data[ 0 ] );
				setLoading( false );
			} )
			.catch( ( err ) => console.log( err ) );

		axios
			.get( `wp/v2/comments?post=${ id }` )
			.then( ( res ) => setComments( res.data ) );
	}, [] );

	return (
		<div className="post__container">
			{ showComments ? (
				<div className="comments__container">
					<span
						onClick={ () => setShowComments( false ) }
						onKeyDown={ () => setShowComments( false ) }
						role="button"
						tabIndex={ 0 }
					>
						<i className="fa fa-arrow-left fa-lg back__button"></i>
					</span>
					<span
						onClick={ window.history.back() }
						role="button"
						onKeyDown={ window.history.back() }
						tabIndex={ 0 }
					>
						<i className="fa fa-window-close fa-lg"></i>
					</span>
					<div className="comments__inner">
						<Comments comments={ comments } />
					</div>
				</div>
			) : post === undefined || post === null ? (
				<NomatchMessage
					message={ 'There is no such post available.' }
					isLoading={ isLoading }
				/>
			) : (
				<div className="post">
					<div className="post__close">
						<span
							onClick={ window.history.back() }
							role="button"
							onKeyDown={ window.history.back() }
							tabIndex={ 0 }
						>
							<i className="fa fa-window-close fa-lg"></i>
						</span>
					</div>
					<img
						src={
							post?._embedded[ 'wp:featuredmedia' ][ 0 ]
								?.source_url
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
						<p>Total Comments: { comments.length }</p>
						<button
							className="nomatch__button"
							disabled={ comments.length === 0 }
							onClick={ () => setShowComments( true ) }
						>
							View comments{ ' ' }
							<i className="fa fa-comment fa-lg"></i>
						</button>
					</div>
				</div>
			) }
		</div>
	);
};
export default Post;
