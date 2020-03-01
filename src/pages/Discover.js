//#region Core Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
//#endregion

//#region Project Components
import SuggestionsFeed from '../components/feed/SuggestionsFeed';
import PostFeed from '../components/feed/PostFeed';
//#endregion

//#region Styles, Assets and Resources
import '../styles/discover.css';
import '../styles/feed.css';
import '../components/feed/post.css';
//#endregion

//#region Local Components => to be refactored
// import React from 'react'
// import PropTypes from 'prop-types'

const DiscoveryFeed = (props) => {
	const { post_list } = props;
	return (
		<div className='feed_container'>
			<section className='feed_section'>
				{/* <PostWriter /> */}
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
	);
};

DiscoveryFeed.propTypes = {
	post_list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// export default DiscoveryFeed
//#endregion

const Discovery = (props) => {
	// let match = useRouteMatch();
	const post_list = useSelector((state) => state.feed.posts);

	return (
		<div className='discovery_container'>
			{/* The Topics page has its own <Switch> with more routes
				that build on the /topics URL path. You can think of the
				2nd <Route> here as an "index" page for all topics, or
			the page that is shown when no topic is selected */}
			{/* <DiscoveryFeed post_list={post_list} /> */}
			<DiscoveryFeed post_list={post_list} />
			{/* <Routes>
				<Route path={'/'} element={} />
				<Route path={`:topicId`} element={<Topic />} />
			</Routes> */}
			{/*<h2>Topics</h2>
			<ul>
				<li>
					<Link to={`components`}>Components</Link>
				</li>
				<li>
					<Link to={`props-v-state`}>Props v. State</Link>
				</li>
			</ul> */}
		</div>
	);
};

// function Topic() {
// 	let { topicId } = useParams();
// 	return <h3>Requested topic ID: {topicId}</h3>;
// }
Discovery.propTypes = {};

export default Discovery;
