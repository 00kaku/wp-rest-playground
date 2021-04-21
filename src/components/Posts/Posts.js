import "./Posts.css";

const Posts = ({posts}) =>{
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
