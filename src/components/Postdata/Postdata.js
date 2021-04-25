import React from 'react';
import NomatchMessage from '../NomatchMessage/NomatchMessage';
import GoBackButton from '../GoBackButton/GoBackButton';
/**
 * The component that will actually render the data for an individual post.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.post The post( Defined at Post component ) that is to be rendered.
 * @param {boolean} props.isLoading The bit ( Defined at Post component ) that is to be passed to Nomatch message if fetch return null.
 * @param {Array} props.comments The array( Defined at Post component ) that contains the comments of the post.
 * @param {Function} props.setShowComments The funciton( Defined at Post component ) that is used to toggle comments visibility.
 * @return {React.Component} Return the PostData component.
 **/
const Postdata = ( { post, isLoading, comments, setShowComments } ) => {
	return ! post || null === post ? (
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
				src={ post?._embedded[ 'wp:featuredmedia' ][ 0 ]?.source_url }
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
					{ 0 <= comments?.length
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
};

export default Postdata;
