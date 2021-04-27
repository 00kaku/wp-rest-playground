import React, { useEffect, useState } from 'react';
import { getPostSearch } from '../../api/api';
import Posts from '../../components/Posts/Posts';
import NomatchMessage from '../../components/NomatchMessage/NomatchMessage';
import Error from '../../components/Error/Error';

/**
 * The container for the posts searched by term by using the search bar on main page.
 *
 * @return {React.Component} Return the PostsSearch component.
 */
const PostsSearch = () => {
	const term = localStorage.getItem( 'term' );
	const [ posts, setPosts ] = useState( [] );
	const [ isLoading, setLoading ] = useState( true );
	const [ error, setError ] = useState( null );
	useEffect( () => {
		getPostSearch( term, setPosts, setLoading, setError );
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

	return <div>{ null !== error ? <Error /> : postData }</div>;
};
export default PostsSearch;
