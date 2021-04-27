import axios from '../axios';
/**
 * The function to login into the website using JWT api end point.
 *
 * @param {Object} loginData The object that contains the login data.
 * @param {Function} dispatch The dispatcher ( Defined in App.js ) function to update the state using reducer.
 * @param {Function} setError Function to update the error state variable if api fetch fails.
 * @param {Function} setFailed Function to update the state variable if query fails with some error based on user input.
 * @param {Function} setRedirect Function to redirect the user to main page after successful login.
 * @return {undefined}
 */
export const login = (
	loginData,
	dispatch,
	setError,
	setFailed,
	setRedirect
) => {
	axios
		.post( `/wp-json/jwt-auth/v1/token`, loginData )
		.then( ( res ) => {
			if ( ! res.data.token ) {
				setError( res.data.message );
				return;
			}
			dispatch( {
				type: 'LOGIN',
				payload: res.data,
			} );
			setRedirect( true );
		} )
		.catch( ( err ) => {
			if ( 403 === err.response?.data?.data?.status ) {
				setError( err.response.data.message );
			} else {
				setFailed( err );
			}
		} );
};
/**
 * The function to fetch comments for a given post id.
 *
 * @param {Integer} id Id of the post
 * @param {Function} setComments Function to add fetched comments to state.user.
 * @return {undefined}
 */
export const getComments = ( id, setComments ) => {
	axios
		.get( `/wp-json/wp/v2/comments?post=${ id }` )
		.then( ( res ) => setComments( res.data ) )
		.catch( () => setComments( null ) );
};

/**
 * The function to post comments for a given post id in the database.
 *
 * @param {Integer} id Id of the post
 * @param {String} postComment The string of the comment to be posted.
 * @param {Object} user User details of the logged in user.
 * @param {Function} setSuccess The function to update state variable on success.
 * @param {Function} setComment The function to clear the comment box.
 * @param {Function} setFailed The function to update state variable on failure.
 * @return {undefined}
 */
export const setComments = (
	id,
	postComment,
	user,
	setSuccess,
	setComment,
	setFailed
) => {
	axios
		.post(
			`/wp-json/wp/v2/comments`,
			{
				author_email: user.user_email,
				author_name: user.user_display_name,
				content: postComment.replace( /(<([^>]+)>)/gi, '' ),
				post: id,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${ user.token }`,
				},
			}
		)
		.then( () => {
			setSuccess( true );
			setComment( '' );
		} )
		.catch( () => setFailed( true ) );
};

/**
 * The function to fetch post for a given post id.
 *
 * @param {Integer} id Id of the post
 * @param {Function} setPost Set the post into local state.
 * @param {Function} setLoading Function to update the loading state of the query.
 * @param {Function} setError Function to update the error state variable if query fails.
 * @return {undefined}
 */
export const getPost = ( id, setPost, setLoading, setError ) => {
	axios
		.get( `/wp-json/wp/v2/posts?_embed&include=${ id }` )
		.then( ( res ) => {
			setPost( res.data[ 0 ] );
			setLoading( false );
		} )
		.catch( ( err ) => setError( err ) );
};

/**
 * The function to fetch post for a given post id.
 *
 * @param {Function} setNav The function to set the nav variable of the state.
 * @return {undefined}
 */
export const getNav = ( setNav ) => {
	axios
		.get( '/wp-json/wc/v1/nav' )
		.then( ( res ) => setNav( res.data ) )
		.catch( () => setNav( '<p>Failed to load Nav</p>' ) );
};

/**
 * The function to fetch posts for a given category.
 *
 * @param {string} category The category for which to fetch posts.
 * @param {Function} setPosts The function to set the posts variable of the state.
 * @param {Function} setNoPost The function to set the posts variable of the state when there are no posts for the given category.
 * @param {Function} setError The function to set the variable of the state when api faces an error.
 * @return {undefined}
 */
export const getPostCategory = ( category, setPosts, setNoPost, setError ) => {
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
};

/**
 * The function to fetch posts for a given search term.
 *
 * @param {string} term The term for which to fetch posts.
 * @param {Function} setPosts The function to set the posts variable of the state.
 * @param {Function} setLoading Function to update the loading state of the query.
 * @param {Function} setError The function to set the variable of the state when api faces an error.
 * @return {undefined}
 */
export const getPostSearch = ( term, setPosts, setLoading, setError ) => {
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
};
