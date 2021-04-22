import {useEffect,useState} from 'react';
import axios from '../../axios';
import Posts from '../../components/Posts/Posts';
import NomatchMessage from '../../components/NomatchMessage/NomatchMessage';
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
							"thumbnail" : post['_embedded']["wp:featuredmedia"][0]["source_url"]
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

			{ posts.length===0 ?
				<NomatchMessage message={'No post contain the term you searched for.'} isLoading={isLoading} />:
				<Posts posts={posts} />
			}
		</div>
	)
}

export default PostsSearch;
