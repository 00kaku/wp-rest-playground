import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import Postdata from '../Postdata/Postdata';
import Comments from '../Comments/Comments';
import Error from '../Error/Error';
import './Post.css';
/**
 * The container that renders the individual post based on its id. It uses two compoents PostData and Comments.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.user The object that represents the logged in user.
 * @return {React.Component} Returns the Post component.*/
const Post = ( { user } ) => {
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
			.catch( () => setComments( null ) );
	}, [] );

	return (
		<div className="post__container">
			{ showComments ? (
				<Comments
					comments={ comments }
					setShowComments={ setShowComments }
					user={ user }
				/>
			) : (
				( error && <Error /> ) || (
					<Postdata
						post={ post }
						isLoading={ isLoading }
						comments={ comments }
						setShowComments={ setShowComments }
					/>
				)
			) }
		</div>
	);
};
export default Post;
