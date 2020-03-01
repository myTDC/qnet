import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import './channel.css';

const Channel = (props) => {
	let { cid } = useParams();
	return (
		<div className='channel_container'>
			<h2>Hi i'm a channel page</h2>
			<br />
			<br />
			<p>My id is: {cid}</p>
		</div>
	);
};

Channel.propTypes = {
	cid: PropTypes.string,
};

export default Channel;
