import React /*, { useState } */ from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate, Navigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { EuiSuperSelect, EuiText } from '@elastic/eui';

// import '@elastic/eui/dist/eui_theme_light.css';
import PostWriter from '../components/feed/PostWriter';
import SuggestionsFeed from '../components/feed/SuggestionsFeed';
import PostFeed from '../components/feed/PostFeed';

import '../styles/feed.css';

// const options = [
// 	{
// 		value: 'all',
// 		inputDisplay: 'All',
// 		dropdownDisplay: (
// 			<>
// 				<strong>Show posts from everywhere</strong>
// 				<EuiText size='s' color='subdued'>
// 					<p className='euiTextColor--subdued'>
// 						Show posts from public channels
// 					</p>
// 				</EuiText>
// 			</>
// 		),
// 	},
// 	{
// 		value: 'trending',
// 		inputDisplay: 'Trending',
// 		dropdownDisplay: (
// 			<>
// 				<strong>Trending Posts</strong>
// 				<EuiText size='s' color='subdued'>
// 					<p className='euiTextColor--subdued'>
// 						Shows posts that are trending.
// 					</p>
// 				</EuiText>
// 			</>
// 		),
// 	},
// 	{
// 		value: 'personalized',
// 		inputDisplay: 'Personalized Posts',
// 		dropdownDisplay: (
// 			<>
// 				<strong>Presonalized Posts</strong>
// 				<EuiText size='s' color='subdued'>
// 					<p className='euiTextColor--subdued'>
// 						Shows posts personalized to your activity.
// 					</p>
// 				</EuiText>
// 			</>
// 		),
// 	},
// ];

function Feed(props) {
	//selecting data filter for the feed
	// const [active_feed, setActiveFeed] = useState('all');
	const post_list = useSelector((state) => state.feed.posts);

	return (
		<div className='feed_layout'>
			<section className='feed_controls'>I have the controls</section>
			<div className='feed_container'>
				<section className='feed_section'>
					<PostWriter />
					<main className='feed_main'>
						<header className='feed_main_filters'>
							<span className='feed_title'>Feed | Top posts today</span>
							{/* <EuiSuperSelect
								popoverClassName='feed_filter_selector'
								options={options}
								valueOfSelected={active_feed}
								onChange={(value) => setActiveFeed(value)}
								itemLayoutAlign='top'
								hasDividers
								// fullWidth
							/> */}
						</header>
						{/*rendering feed with components by passing selected filter data in the components*/}
						<PostFeed post_list={post_list} />
					</main>
				</section>

				<SuggestionsFeed />
			</div>
		</div>
	);
}

// Feed.propTypes = {};

export default Feed;
