import React from 'react'; // useEffect
import { useParams } from 'react-router';
import PostRenderer from './PostRenderer';
import { useSelector } from 'react-redux';

const PostFull = (props) => {
	let params = useParams();
	// console.log('PostFull.js > post id is: ', params);
	let style = null;

	let post = useSelector(
		(state) => state.feed.posts.find((post) => post.id === params.pid)
		// (state) => state.feed.posts,
		// (posts) => posts.find((post) => post.id === id)
	);
	// console.log('PostFull.js > post selector has post: ', post);
	// useEffect(() => {

	// }, [post]);

	return (
		<div>
			<PostRenderer {...post} style={style} />
		</div>
	);
};

PostFull.propTypes = {};

export default PostFull;
