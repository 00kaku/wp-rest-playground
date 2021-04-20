import {useState,useEffect} from 'react';
import axios from '../../axios';
import "./Posts.css";

const Posts = () =>{

	const [posts,setPosts] = useState([]);

	useEffect(()=>{
		const category = window.location.pathname.split("/").pop();

		axios.get(`posts?category=${category}`)
		.then (res => setPosts(res.data))
		.catch(err => console.log(err));

	},[])

	console.log(posts);
	return (
		<div className="posts">
			{posts.map( post=>(
								<div className="card" key={post.id}>
									<div className="card__inner">
  										<img src={post.featured_image.thumbnail} alt="Avatar" />
											<div className="text"><b>{post.title}</b></div>
									</div>
								</div> )
			)
			}
		</div>
	)
}

export default Posts;
