import { createAction, createReducer } from '@reduxjs/toolkit';
// import { timeLogger } from '../commons';
// import { batch } from 'react-redux';
// import { getAuthRef, gProvider, usersCollectionRef } from '../../services/fb';

export const gettingUserData = createAction('USER_DATA_FETCH_INIT');
export const gotUserData = createAction('USER_DATA_FETCHED');
export const errorGettingUserData = createAction('USER_DATA_FETCH_ERROR');

export const isFirstTimeUser = createAction('USER_FIRST_INIT_DATA'); //Log account creation date
export const userSkippedProfileCreation = createAction(
	'USER_SKIPPED_INIT_DATA'
); //Log account creation date
export const isReturningUser = createAction('USER_FIRST_INIT_DATA'); //Log lastest login date

export const creatingUserData = createAction('USER_DATA_CREATE_INIT');
export const createdUserData = createAction('USER_DATA_CREATED');
export const errorCreatingUserData = createAction('USER_DATA_CREATION_ERROR');

export const updatingUserData = createAction('USER_DATA_UPDATE_INIT');
export const updatedUserData = createAction('USER_DATA_UPDATED');
export const errorUpdatingUserData = createAction('USER_DATA_UPDATION_ERROR');

const initialState = {
	// status verbs
	creatingUser: false,
	fetchingUserData: false,

	// status flags
	is_new_user: false,
	is_returning_user: false,

	// login data
	first_login: null,
	first_login_formatted: null,
	lastLogin: null,

	// user data
	profile_id: null,
	email_id: null,
	uid: null,
	user_meta: {
		given_name: null,
		family_name: null,
		pic_src: null,
		phone_num: null,
		email_verified: false,

		role: 'visitor',
		access: 'free',
	},

	userPreferences: [{ id: 'theme', value: 'light' }],
	authored_posts: [],
	channels: [],
	channelsFollowed: [],
	// hasOrders: [],

	gotError: false,
	error_code: false,
	error_message: null,
};

const userReducer = createReducer(initialState, {
	[gettingUserData.type]: (state) => {
		console.log('Auth Process Started');
		state.fetchingUserData = true;
		state.isFirstTimeUser = true;
	},
	[gotUserData.type]: (state, action) => {
		state.fetchingUserData = false;
		state.user = action.payload.newUser;
		state.userProfileId = action.payload.newUser.profileId;
	},
	[userSkippedProfileCreation.type]: (state, action) => {
		state.isFirstTimeUser = false;
	},

	// [gotErrorAuthenticatingUser.type]: (state, action) => {
	// 	state.authing = false;
	// 	state.gotError = true;
	// 	state.error = action.payload.error;
	// },
	// [gettingUserData.type]: (state) => {
	// 	state.getting = true;
	// },
	// [gotUserExists.type]: (state, action) => {
	// 	state.getting = false;
	// 	// state.user = action.payload.newUser;
	// 	// state.userProfileId = action.payload.newUser.profileId;
	// },
	// [gotErrorCheckingUserData.type]: (state, action) => {
	// 	state.getting = false;
	// 	state.gotError = true;
	// 	state.error = action.payload.error_code;
	// },
	// [creatingUser.type]: (state) => {
	// 	state.creatingUser = true;
	// 	state.authing = true;
	// },
	// [createdUser.type]: (state, action) => {
	// 	state.authing = false;
	// },
	// [gotErrorCreatingUser.type]: (state, action) => {
	// 	state.authing = false;
	// 	state.gotError = true;
	// 	state.error = action.payload.error_code;
	// },
});

export default userReducer;
