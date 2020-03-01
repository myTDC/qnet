//#region Core Libs
import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//#endregion

//#region Project Components
import Feed from './Feed';
//#endregion

//#region  styles, images & assets
import '../styles/landing_public.css';
//#endregion

function handleCloseHandler() {
	//check Login
	//If not logged in open a dialog for sign in
	alert('Closing the header to get whole feed'); //remove placeholder alert
}
const LandingPublic = (props) => {
	let navigate = useNavigate();
	let firstRun = useSelector((state) => state.user.isFirstTimeUser);
	let user_fromAuth = useSelector((state) => state.auth.user);

	if (user_fromAuth != null && firstRun === true) {
		/* {console.log('Navigating to new route for first itme users')} */
		navigate('/firstLogin');
		/* return <Navigate to={`/users/${user.nameGiven}/firstLogin`} /> */
		/* {console.log('Updating state after navigating to new route')} */
	}

	return (
		<div className='landing_container'>
			<header className='landing_header'>
				<p className='landing_intro'>The social network you deserve</p>
				<button
					className='landing_intro_close'
					onClick={() => handleCloseHandler()}>
					x
				</button>
			</header>
			<Feed />
		</div>
	);
};

LandingPublic.propTypes = {};

export default LandingPublic;
