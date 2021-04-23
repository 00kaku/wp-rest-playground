import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';
import Posts from '../../components/Posts/Posts';
import Error from '../../components/Error/Error';

const PostsCategory = () => {
	const [ posts, setPosts ] = useState( [] );
	const [ noPost, setNoPost ] = useState( false );
	const [ error, setError ] = useState( null );
	useEffect( () => {
		const category = window.location.pathname.split( '/' ).pop();
		axios
			.get( `/wp-json/wc/v1/posts?category=${ category }` )
			.then( ( res ) => {
				if ( res.data === 'category does not exist' ) {
					setNoPost( true );
				} else {
					setPosts( res.data );
				}
			} )
			.catch( ( err ) => setError( err ) );
	}, [] );

	if ( noPost === true ) {
		return <Redirect to="/404" />;
	}
	return (
		<div>{ error !== null ? <Error /> : <Posts posts={ posts } /> }</div>
	);
};

export default PostsCategory;
