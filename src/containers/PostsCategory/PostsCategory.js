import {useState,useEffect} from 'react';
import axios from '../../axios';
import {Redirect} from 'react-router-dom';
import Posts from '../../components/Posts/Posts';

const PostsCategory = () =>{

	const [posts,setPosts] = useState([]);
	const [noPost,setNoPost] = useState(false);
	useEffect(()=>{
		const category = window.location.pathname.split("/").pop();

		axios.get(`/wc/v1/posts?category=${category}`)
		.then (res =>{
			 if(res.data === 'category does not exist')
			 	{ setNoPost(true); }
			 else{ setPosts(res.data) }
			 })
		.catch(err => console.log(err));

	},[])

	if(noPost === true){
		return <Redirect to="/404" />
	}
	return (
		<div>
			<Posts posts={posts} />
		</div>
	)
}

export default PostsCategory;
