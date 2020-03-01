//#region libs
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, useField, FastField } from 'formik';
// import * as Yup from 'yup';
// import {
// 	TextareaAutosize,
// 	Select,
// 	MenuItem,
// 	FormControl,
// 	InputLabel,
// 	TextField,
// } from '@material-ui/core/';

//#endregion

//#region components
import ErrorBoundary from '../components/error_handling/ErrBound';
import ErrorFallback from '../components/error_handling/ErrorFallback';
// import ScreenDebugger from '../components/error_handling/ScreenDebugger';
import ChannelCreator from '../components/channels/ChannelCreator';
//#endregion

//#region store ops
// import {
// 	savePosttoStore,
// 	publishPosttoDB,
// } from '../../store/reducers/postWriter';
import { skipProfileCreation } from '../store/actions/user';

//#endregion

//#region styles & res
import '../styles/profile_creator.css';
// import userpic_default from '../../res/avatars/avatar_female_tshirt.svg';
// import Selector from '../mui/Selector';

//#endregion

//#region TODO List
// this component will only show up when creating a new user. redirect should be limited to the new user creation flow
// this component will also have an instance of Channel Creator

//#endregion

function ProfileCreator(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const user = useSelector((state) => state.auth.user);
	const firstRun = useSelector((state) => state.user.isFirstTimeUser);

	useEffect(() => {
		if (!firstRun) {
			/* {console.log('Navigating to new route for first itme users')} */
			navigate('/');
			/* return <Navigate to={`/users/${user.nameGiven}/firstLogin`} /> */
			/* {console.log('Updating state after navigating to new route')} */
		}
		// return () => {
		// 	cleanup;
		// };
	}, [firstRun, navigate]);

	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<div className='profile_creator_container'>
				display user data ask for user info
				<br />
				but with a skip for now button
				<br />
				display a channel name creator
				<br />
				<br />
				<button
					onClick={() => {
						dispatch(skipProfileCreation());
					}}>
					skip profile creation
				</button>
				<br />
				<br />
				<ChannelCreator with_modal={false} />
			</div>
		</ErrorBoundary>
	);
}

// ProfileCreator.propTypes = {
// 	user: PropTypes.object,
// };

export default ProfileCreator;
