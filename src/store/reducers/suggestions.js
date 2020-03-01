import { createReducer, createAction } from '@reduxjs/toolkit';

const dummy_sug_list = [
	//dummy data for suggested channels
	{ id: '1', title: 'programming_tips', icon: null },
	{ id: '2', title: 'startup_tips', icon: null },
	{ id: '3', title: 'project_tips', icon: null },
	{ id: '4', title: 'programming_tips', icon: null },
	{ id: '5', title: 'startup_tips', icon: null },
	{ id: '6', title: 'project_tips', icon: null },
	{ id: '7', title: 'programming_tips', icon: null },
	{ id: '8', title: 'startup_tips', icon: null },
	{ id: '9', title: 'project_tips', icon: null },
	{ id: '10', title: 'project_tips', icon: null },
];

export const authenticatingUser = createAction('USER_AUTH_INIT');
export const authenticatedUser = createAction('USER_AUTH_DONE');
export const gotErrorAuthenticatingUser = createAction('USER_AUTH_ERROR');

export const gettingUserData = createAction('USER_DATA_CHECK');
export const gotUserExists = createAction('USER_DATA_EXISTS');
export const gotErrorCheckingUserData = createAction('USER_DATA_CHECK_ERROR');

export const creatingUser = createAction('USER_DATA_INITIALIZING');
export const createdUser = createAction('USER_DATA_INITIALIZED');
export const gotErrorCreatingUser = createAction('USER_DATA_INIT_ERROR');

const initialState = { suggests: dummy_sug_list };

const sugReducer = createReducer(initialState, {
	[authenticatingUser.type]: (state) => {
		state.authing = true;
	},
	[authenticatedUser.type]: (state, action) => {
		state.authing = false;
		// state.user = action.payload.newUser;
		// state.userProfileId = action.payload.newUser.profileId;
	},
	// [gotErrorAuthenticatingUser.type]: (state, action) => {
	// 	state.authing = false;
	// 	state.gotError = true;
	// 	state.error = action.payload.error;
	// },
});

export default sugReducer;
