import {useEffect,useState} from 'react';
import axios from '../../axios';
import Posts from '../../components/Posts/Posts';
import {Link} from 'react-router-dom';
const PostsSearch = () =>{
	const term = localStorage.getItem('term');
	const [posts,setPosts] = useState([]);
	const [isLoading, setLoading] = useState(true);
	useEffect(() =>{
			axios.get(`/wp/v2/posts?_embed&search=${term}`)
			.then(res => {

				console.log(res);
				setPosts(res.data.map(post => {
					return {
						"title": post.title.rendered,
						"id": post.id,
						"featured_image" : {
							"thumbnail" : post['_embedded']["wp:featuredmedia"][0]["source_url"],
							"large" : post['_embedded']["wp:featuredmedia"]["source_url"]
						},
						"excerpt" : post.excerpt,
						"content" : post.content.rendered
					}
				})
				)
				setLoading(false);
			})
			.catch(err => console.log(err));
	},[term])

	return (
		<div>

			{ posts.length==0 ?
				(<div className="nomatch">
				<div className="nomatch__inner">
					{isLoading ?
						<h1>LOADING<span className="fa fa-cog fa-spin"></span></h1> :
						(<>
						<h1>Oops<i className="fa fa-exclamation"></i></h1>
						<p>No post contain the term you searched for.</p>
						<Link to="/" className="nomatch__button"> Go Home </Link>
						</>)
					}
				</div>

				</div>):
				<Posts posts={posts} />
			}
		</div>
	)
}

export default PostsSearch;
