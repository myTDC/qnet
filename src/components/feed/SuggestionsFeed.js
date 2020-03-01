import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SuggestionCard from './SuggestionCard';

function SuggestionsFeed(props) {
	const sug_list = useSelector((state) => state.suggests.suggests);
	return (
		<aside className='feed_suggestions'>
			<header className='suggestions_filters'>
				{/* <EuiSuperSelect
					popoverClassName='suggestions_selector'
					options={options}
					valueOfSelected={active_feed}
					onChange={(value) => setActiveFeed(value)}
					itemLayoutAlign='top'
					hasDividers
					// fullWidth
				/> */}
				Top Channels Today
			</header>
			<div className='suggestions_content'>
				{sug_list &&
					sug_list.map((item) => {
						return <SuggestionCard {...item} key={item.id} />;
					})}
			</div>
		</aside>
	);
}

SuggestionsFeed.propTypes = {};

export default SuggestionsFeed;
