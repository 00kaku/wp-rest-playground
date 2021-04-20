import {useState,useEffect} from 'react';
import axios from '../../axios';

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
		<div>
			{ }
		</div>
	)
}

export default Posts;
