import React, { Suspense } from 'react';
// import PropTypes from 'prop-types';

import './suggestionsCard.css';
import { Link } from 'react-router-dom';

const SuggestionCard = ({ title, icon }) => {
	//get user data to fund if user already follows the channel.
	//toggle the follow button to reflect if user follows the channel
	//followed channel suggestions display more data than unfollowed channels

	return (
		<div className='suggestions_item_card'>
			<Suspense
				delay='50ms'
				fallback={
					<div className='suggestion_channel_pic'>Loading awesome stuff!</div>
				}>
				<img
					src={icon}
					width='32px'
					height='32px'
					alt='displays channel pic'
					className='suggestion_channel_pic'
				/>
			</Suspense>
			<div className='suggestion_item_details'>
				<Link to={`/channels/${title}`} className='suggestion_item_title'>
					{title}
				</Link>
			</div>
			<button
				className='suggestion_btn_join'
				onClick={() => {
					alert(`Joined ${title} channel!`);
				}}>
				Join
			</button>
		</div>
	);
};

SuggestionCard.propTypes = {};

export default SuggestionCard;
