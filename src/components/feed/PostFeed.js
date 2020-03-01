import React from 'react';
// import PropTypes from 'prop-types';
import PostRenderer from './PostRenderer';

// import { VariableSizeList as FeederList } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';

function PostFeed({ post_list, style }) {
	// const getItemSize = (index) => post_list[index];
	// const getItemCount = post_list.length;

	return (
		<ul>
			{post_list &&
				post_list.map((post) => {
					return (
						<li key={post.id}>
							<PostRenderer {...post} style={style} />
						</li>
					);
				})}
		</ul>
	);
	// const FeederListItem = () => {
	// 	return (
	// 		<>
	// 			{post_list &&
	// 				post_list.map((post) => <PostRenderer {...post} key={post.id} />)}
	// 		</>
	// 	);
	// };
	// return (
	// 	<div style={{ flex: '1 1 auto' }}>
	// 		<FeederList
	// 			className='List'
	// 			height={window.innerHeight}
	// 			width={window.innerWidth}
	// 			itemCount={getItemCount}
	// 			itemSize={() => 35}>
	// 			{FeederListItem}
	// 		</FeederList>
	// 	</div>
	// );
}

PostFeed.propTypes = {};

export default PostFeed;
