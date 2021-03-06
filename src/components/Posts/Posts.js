import React from 'react';
import './Posts.css';
import { Link } from 'react-router-dom';

/**
 * Component that renders a list of posts' thumbnail cards in a grid.
 *
 * @param {Object} props Component properties.
 * @param {Array} props.posts The array that contains the posts.
 * @return {React.Component} Returns the Posts component.*/
const Posts = ( { posts } ) => {
	return (
		<div className="posts">
			{ posts?.map( ( post ) => (
				<Link to={ `post/${ post.id }` } key={ post.id }>
					<div className="card">
						<div className="card__inner">
							<img
								src={ post?.featured_image?.thumbnail }
								alt={ `A poster of ${ post.title }` }
							/>
							<div className="text">
								<b>{ post.title }</b>
							</div>
						</div>
					</div>
				</Link>
			) ) }
		</div>
	);
};

export default Posts;
