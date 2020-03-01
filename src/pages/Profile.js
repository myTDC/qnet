import React from 'react';
import { useSelector } from 'react-redux';
import ScreenDebugger from '../components/error_handling/ScreenDebugger';
// import PropTypes from 'prop-types';

const Profile = (props) => {
	const user_fromAuth = useSelector((state) => state.auth.user);
	const user_fromUsers = useSelector((state) => state.user.user);
	return (
		<div>
			Hi! <br />
			I'm user Profile
			<ScreenDebugger
				source='Profile.js > User from auth reducer'
				values={user_fromAuth}
			/>
			<ScreenDebugger
				source='Profile.js > User from user reducer '
				values={user_fromUsers}
			/>
		</div>
	);
};

Profile.propTypes = {};

export default Profile;
