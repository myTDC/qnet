import React, { useState, Suspense } from 'react';
// import PropTypes from 'prop-types';
import './post.css';
import userpic_default from '../../res/avatars/avatar_male_no_specs.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

//#region Local components => To be refactored
// import React from 'react'
// import PropTypes from 'prop-types'

const PostCommentor = (props) => {
	const [comment, setcomment] = useState('');
	return (
		<div>
			<form
				className='commenter'
				onSubmit={() => console.log('comment posted:', comment)}>
				<textarea
					type='text'
					className='comment_writer'
					value={comment}
					rows='1'
					onChange={(e) => setcomment(e.target.value)}
					placeholder={'have your say'}
				/>
				<button className='comment_submit' type='submit'>
					post
				</button>
				{/* <p className='comment_count'>
					<span role='img' aria-label='comment count indicator'>
						💬{' '}
					</span>
					5
				</p> */}
			</form>
		</div>
	);
};

PostCommentor.propTypes = {};

// export default PostCommentor;

// import React from 'react'
// import PropTypes from 'prop-types'

const PostMeta = (props) => {
	const {
		like_count,
		// share_count
	} = props;

	const [liked, setliked] = useState(0);
	const [likes, setlikes] = useState(like_count);

	const handleIncrement = () => {
		//Add to the likes of the user and remove from dislikes of the user
		setliked(1);
		setlikes(likes + 1);
		//dispatch action to add to the likes of the user and of the post
	};

	const handleDecrement = () => {
		//Remove from likes and add to dislikes of the user
		setliked(-1);
		setlikes(likes - 1);
	};

	return (
		<div className='post_meta'>
			<div className='post_source'>
				<span className='post_source_indic'>source: </span>
				<span className='post_source_value'>
					{'https://www.google.com/external_link'}
				</span>
			</div>
			<div className='post_metrics'>
				<div className='comment_count'>
					<span role='img' aria-label='comment count indicator'>
						💬{' '}
					</span>
					5
				</div>

				{/* <p className='comments'>saves: 2</p> */}
				<div className='liker'>
					<button
						className={
							liked === 1 ? 'liker_button liker_active' : 'liker_button'
						}
						onClick={() => handleIncrement()}>
						<i className='material-icons' role='img' aria-label='unlike button'>
							keyboard_arrow_up
						</i>
					</button>

					<p className='likes'>{likes}</p>

					<button
						className={
							liked === -1 ? 'liker_button liker_active' : 'liker_button'
						}
						onClick={() => handleDecrement()}>
						<i className='material-icons' role='img' aria-label='unlike button'>
							keyboard_arrow_down
						</i>
					</button>
				</div>
				<div className='quick_share'>
					{/* <div className='share_count'>{share_count ? share_count : 25}</div> */}

					<p className='share_options'>
						<i className='material-icons share_icon'>share</i> link
					</p>
				</div>
			</div>
		</div>
	);
};

PostMeta.propTypes = {};

// export default PostMeta

//#endregion

const PostRenderer = (props) => {
	// console.log('Post Details: ', props);
	const { id, post_type, title, img_src, share_count, like_count } = props;

	let navigate = useNavigate();

	const gotoPost = (id) => {
		navigate(`/posts/${id}`);
	};
	// const [post_view, setpost_view] = useState(post_type);

	function renderSwitch(post_type) {
		switch (post_type) {
			case 'text_only': {
				return (
					<div className='post_texty'>
						I can only show the text posts: {title}. I am very text focused and
						i will overflow into the next line and the the line after that just
						for fun
					</div>
				);
			}
			case 'image_only': {
				return (
					<div className='post_imagery'>
						<figure>
							<Suspense
								delay='50ms'
								fallback={
									<img
										src={null}
										width='480px'
										height='360px'
										alt='displays pic for the current post'
										className='post_imagery_pic'
										loading='lazy'
										decoding='async'
									/>
								}>
								<img
									src={img_src}
									width='100%'
									height='auto'
									alt='displays pic for the current post'
									className='post_imagery_pic'
									loading='lazy'
									decoding='async'
								/>
							</Suspense>
							<figcaption className='post_imagery_caption'>
								I will show the image and caption posts: {title}
							</figcaption>
						</figure>
					</div>
				);
			}
			case 'image_text': {
				return (
					<div className='post_combo'>
						<div className='post_combo_text'>
							I am going to show the image and text posts {title}
						</div>
						<figure className='post_combo_fig'>
							<Suspense
								delay='50ms'
								fallback={
									<div className='suggestion_channel_pic'>
										Loading awesome stuff!
									</div>
								}>
								<img
									src={img_src}
									width='100%'
									height='auto'
									alt='displays pic for the current post'
									className='post_imagery_pic'
									loading='lazy'
									decoding='async'
								/>
							</Suspense>
						</figure>
					</div>
				);
			}
			default: {
				return (
					<div className='post_unexpected'>
						I'll show unexpected post types {title}
					</div>
				);
			}
		}
	}
	return (
		<div className='post_item_container'>
			<header className='post_header' onClick={() => gotoPost(id)}>
				<Suspense
					delay='50ms'
					fallback={
						<div className='suggestion_channel_pic'>Loading awesome stuff!</div>
					}>
					<img
						src={userpic_default}
						width='32px'
						height='32px'
						alt='displays active user avatar'
						className='post_user_avatar'
						loading='lazy'
						decoding='async'
					/>
				</Suspense>
				<div className='post_header_info'>
					<h4 className='post_author_uid'>Author Uid</h4>
					<p className='post_channel'>in Channel</p>
				</div>
			</header>
			<article className='post_content'>{renderSwitch(post_type)}</article>
			<PostMeta like_count={like_count} share_count={share_count} />
			<PostCommentor />
		</div>
	);
};

// PostRenderer.propTypes = {

// }

export default PostRenderer;
