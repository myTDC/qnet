// import { batch } from 'react-redux';
import { createReducer, createAction } from '@reduxjs/toolkit';
//#region Action Creators
export const authenticatingUser = createAction('USER_AUTH_INIT');
export const authenticatedUser = createAction('USER_AUTH_DONE');
export const gotErrorAuthenticatingUser = createAction('USER_AUTH_ERROR');

export const gettingUserData = createAction('USER_DATA_CHECK');
export const gotUserExists = createAction('USER_DATA_EXISTS');
export const gotErrorCheckingUserData = createAction('USER_DATA_CHECK_ERROR');

export const creatingUser = createAction('USER_DATA_INITIALIZING');
export const createdUser = createAction('USER_DATA_INITIALIZED');
export const gotErrorCreatingUser = createAction('USER_DATA_INIT_ERROR');
//#endregion

//#region Actions
export const savePosttoStore = (newPost) => {
	console.log('post saved with data: ', newPost);
	// console.log('post saved with data: ', newPost);
	// dispatch(creatingUser());
	// //TODO: add user roles and accesses
	// const user = setUserAccess(newUser);
	// console.log(
	// 	"User Doesn't Exist. Creating User with Data: ",
	// 	user,
	// 	' at ',
	// 	usersColRef
	// );
	// usersColRef
	// 	.add(user)
	// 	.then((docRef) => {
	// 		console.log('User Created at Doc ID: ', docRef.id);
	// 		dispatch(createdUser());
	// 	})
	// 	.catch((error) => {
	// 		console.error('Error adding User document: ', error);
	// 		dispatch(gotErrorCreatingUser({ error_code: error }));
	// 	});
	return async (dispatch) => {
		dispatch({
			type: 'CREATING_POST',
			payload: {
				content: newPost.content,
				source: newPost.source,
				location: newPost.location,
			},
		});
	};
};

export const publishPosttoDB = (newPost) => {
	return async (dispatch) => {
		// dispatch(creatingUser());
		// //TODO: add user roles and accesses
		// const user = setUserAccess(newUser);
		// console.log(
		// 	"User Doesn't Exist. Creating User with Data: ",
		// 	user,
		// 	' at ',
		// 	usersColRef
		// );
		// usersColRef
		// 	.add(user)
		// 	.then((docRef) => {
		// 		console.log('User Created at Doc ID: ', docRef.id);
		// 		dispatch(createdUser());
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error adding User document: ', error);
		// 		dispatch(gotErrorCreatingUser({ error_code: error }));
		// 	});
	};
};
//#endregion

//#region init state
const initState = {
	isPosting: false,
	post: {
		id: null,
		post_type: null,
		author: null,
		target_channel: null,
		timestamp: null,
		title: null,
		description: null,
		img_src: null,
		votes: null,
		comments: [],
		sources: [],
		verified: false,
		hasSource: false,
		source_verified: false,
	},
};
//#endregion

//#region reducer
const postWriterReducer = createReducer(initState, {
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
//#endregion

export default postWriterReducer;
