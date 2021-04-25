import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';
import Posts from '../../components/Posts/Posts';
import Error from '../../components/Error/Error';

/**
 * The container for the posts searched by category by using the buttons in the nav bar.
 *
 * @return {React.Component} Return the PostsCategory component.
 */
const PostsCategory = () => {
	const [ posts, setPosts ] = useState( [] );
	const [ noPost, setNoPost ] = useState( false );
	const [ error, setError ] = useState( null );
	useEffect( () => {
		const category = window.location.pathname.split( '/' ).pop();
		axios
			.get( `/wp-json/wc/v1/posts?category=${ category }` )
			.then( ( res ) => {
				if ( 'category does not exist' === res.data ) {
					setNoPost( true );
				} else {
					setPosts( res.data );
				}
			} )
			.catch( ( err ) => setError( err ) );
	}, [] );

	if ( true === noPost ) {
		return <Redirect to="/404" />;
	}
	return (
		<div>{ null !== error ? <Error /> : <Posts posts={ posts } /> }</div>
	);
};

export default PostsCategory;
