import React, { useState, useEffect } from 'react';
import Postdata from '../Postdata/Postdata';
import Comments from '../Comments/Comments';
import Error from '../Error/Error';
import './Post.css';
import { AuthContext } from '../../contexts/AuthContext';
import { getComments, getPost } from '../../api/api';
/**
 * The container that renders the individual post based on its id. It uses two compoents PostData and Comments.
 *
 * @return {React.Component} Returns the Post component.*/
const Post = () => {
	const [ post, setPost ] = useState( null );
	const [ isLoading, setLoading ] = useState( true );
	const [ comments, setComments ] = useState( [] );
	const [ showComments, setShowComments ] = useState( false );
	const [ error, setError ] = useState();
	const { state } = React.useContext( AuthContext );
	useEffect( () => {
		const id = window.location.pathname.split( '/' ).pop();
		getPost( id, setPost, setLoading, setError );
		getComments( id, setComments );
	}, [] );

	return (
		<div className="post__container">
			{ showComments ? (
				<Comments
					comments={ comments }
					setShowComments={ setShowComments }
					user={ state.user }
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
