import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import Posts from '../../components/Posts/Posts';
import NomatchMessage from '../../components/NomatchMessage/NomatchMessage';
import Error from '../../components/Error/Error';
const PostsSearch = () => {
	const term = localStorage.getItem( 'term' );
	const [ posts, setPosts ] = useState( [] );
	const [ isLoading, setLoading ] = useState( true );
	const [ error, setError ] = useState( null );
	useEffect( () => {
		axios
			.get( `/wp-json/wp/v2/posts?_embed&search=${ term }` )
			.then( ( res ) => {
				setPosts(
					res.data.map( ( post ) => {
						return {
							title: post.title.rendered,
							id: post.id,
							featured_image: {
								thumbnail:
									post?._embedded?.[ 'wp:featuredmedia' ][ 0 ]
										.source_url,
							},
							excerpt: post.excerpt,
							content: post.content.rendered,
						};
					} )
				);
				setLoading( false );
			} )
			.catch( ( err ) => setError( err ) );
	}, [ term ] );

	const postData =
		0 === posts.length ? (
			<NomatchMessage
				message={ 'No post contain the term you searched for.' }
				isLoading={ isLoading }
			/>
		) : (
			<Posts posts={ posts } />
		);

	return <div>{ error !== null ? <Error /> : postData }</div>;
};
export default PostsSearch;
