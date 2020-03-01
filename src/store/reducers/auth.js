import { createAction, createReducer } from '@reduxjs/toolkit';
// import { timeLogger } from '../commons';
// import { batch } from 'react-redux';
// import { getAuthRef, gProvider, usersCollectionRef } from '../../services/fb';

export const authenticatingUser = createAction('USER_AUTH_INIT');
export const authenticatedUser = createAction('USER_AUTH_DONE');
export const gotErrorAuthenticatingUser = createAction('USER_AUTH_ERROR');

export const gettingUserData = createAction('USER_DATA_CHECK');
export const gotUserExists = createAction('USER_DATA_EXISTS');
export const gotErrorCheckingUserData = createAction('USER_DATA_CHECK_ERROR');

export const creatingUser = createAction('USER_DATA_INITIALIZING');
export const createdUser = createAction('USER_DATA_INITIALIZED');
export const gotErrorCreatingUser = createAction('USER_DATA_INIT_ERROR');

const initialState = {
	authing: false,
	creatingUser: false,
	gettingData: false,
	userProfileId: null,
	user: null,
	gotError: false,
	error: false,
	role: 'visitor',
	access: 'free',
};

const authReducer = createReducer(initialState, {
	[authenticatingUser.type]: (state) => {
		console.log('Auth Process Started');
		state.authing = true;
	},
	[authenticatedUser.type]: (state, action) => {
		state.authing = false;
		state.user = action.payload.newUser;
		state.userProfileId = action.payload.newUser.profileId;
	},
	[gotErrorAuthenticatingUser.type]: (state, action) => {
		state.authing = false;
		state.gotError = true;
		state.error = action.payload.error;
	},
	[gettingUserData.type]: (state) => {
		state.getting = true;
	},
	[gotUserExists.type]: (state, action) => {
		state.getting = false;
		// state.user = action.payload.newUser;
		// state.userProfileId = action.payload.newUser.profileId;
	},
	[gotErrorCheckingUserData.type]: (state, action) => {
		state.getting = false;
		state.gotError = true;
		state.error = action.payload.error_code;
	},
	[creatingUser.type]: (state) => {
		state.creatingUser = true;
		state.authing = true;
	},
	[createdUser.type]: (state, action) => {
		state.authing = false;
	},
	[gotErrorCreatingUser.type]: (state, action) => {
		state.authing = false;
		state.gotError = true;
		state.error = action.payload.error_code;
	},
});

export default authReducer;
