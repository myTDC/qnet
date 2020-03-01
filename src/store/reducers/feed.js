import { createReducer, createAction } from '@reduxjs/toolkit';

const getPic = (size) => {
	return `https://source.unsplash.com/random/${size}&q=90/?"coffee,cake"`;
};

const dummy_post_list = [
	//dummy data for suggested channels
	{
		id: '1',
		title: 'startup_tips',
		post_type: 'image_only',
		img_src: getPic('480x360'),
		like_count: 154,
		share_count: 18,
	},
	{
		id: '2',
		title: 'programming_tips',
		post_type: 'text_only',
		img_src: null,
		like_count: 64,
		share_count: 22,
	},
	{
		id: '3',
		title: 'project_tips',
		post_type: 'image_text',
		img_src: getPic('400x320'),
		like_count: 54,
		share_count: 25,
	},
	{
		id: '4',
		title: 'programming_tips',
		post_type: 'image_only',
		img_src: getPic('480x720'),
		like_count: 65,
		share_count: 11,
	},
	{
		id: '5',
		title: 'startup_tips',
		post_type: 'text_only',
		img_src: null,
		like_count: 32,
		share_count: 18,
	},
	{
		id: '6',
		title: 'project_tips',
		post_type: 'image_only',
		img_src: getPic('480x360'),
		like_count: 48,
		share_count: 22,
	},
	{
		id: '7',
		title: 'programming_tips',
		post_type: 'image_text',
		img_src: getPic('400x340'),
		like_count: 52,
		share_count: 24,
	},
	{
		id: '8',
		title: 'startup_tips',
		post_type: 'image_only',
		img_src: getPic('520x360'),
		like_count: 36,
		share_count: 26,
	},
	{
		id: '9',
		title: 'project_tips',
		post_type: 'text_only',
		img_src: null,
		like_count: 49,
		share_count: 21,
	},
	{
		id: '10',
		title: 'project_tips',
		post_type: 'image_only',
		img_src: getPic('490x380'),
		like_count: 85,
		share_count: 26,
	},
	{
		id: '11',
		title: 'programming_tips',
		post_type: 'text_only',
		img_src: null,
		like_count: 14,
		share_count: 16,
	},
	{
		id: '12',
		title: 'startup_tips',
		post_type: 'image_only',
		img_src: getPic('480x360'),
		like_count: 14,
		share_count: 16,
	},
	{
		id: '13',
		title: 'project_tips',
		post_type: 'image_text',
		img_src: getPic('400x360'),
		like_count: 14,
		share_count: 16,
	},
	{
		id: '14',
		title: 'programming_tips',
		post_type: 'image_only',
		img_src: getPic('440x320'),
		like_count: 14,
		share_count: 16,
	},
	{
		id: '15',
		title: 'startup_tips',
		post_type: 'text_only',
		img_src: null,
		like_count: 14,
		share_count: 16,
	},
	{
		id: '16',
		title: 'project_tips',
		post_type: 'image_only',
		img_src: getPic('420x300'),
		like_count: 92,
		share_count: 22,
	},
	{
		id: '17',
		title: 'programming_tips',
		post_type: 'image_text',
		img_src: getPic('400x320'),
		like_count: 86,
		share_count: 12,
	},
	{
		id: '18',
		title: 'startup_tips',
		post_type: 'image_only',
		img_src: getPic('580x420'),
		like_count: 94,
		share_count: 16,
	},
	{
		id: '19',
		title: 'project_tips',
		post_type: 'text_only',
		img_src: null,
		like_count: 56,
		share_count: 26,
	},
	{
		id: '20',
		title: 'project_tips',
		post_type: 'image_only',
		img_src: getPic('360x480'),
		like_count: 114,
		share_count: 161,
	},
];

export const loadingPosts = createAction('FEED_FETCH_INIT');
export const loadedPosts = createAction('FEED_FETCH_SUCCESS');
export const gotErrorLoadingPosts = createAction('FEED_FETCH_ERROR');
export const updatedFeed = createAction('USER_FEED_UPDATED'); // to indicate that data has been displayed successfully on UI

export const loadingUserPosts = createAction('SELF_FEED_FETCH_INIT');
export const loadedUserPosts = createAction('SELF_FEED_FETCH_SUCCESS');
export const gotErroronLoadSelfPosts = createAction('SELF_FEED_FETCH_ERROR');
export const updatedUserFeed = createAction('SELF_FEED_UPDATED'); // to indicate that data has been displayed successfully on UI

export const loadingSearchResults = createAction('FEED_SEARCH_INIT');
export const loadedSearchResults = createAction('FEED_SEARCH_SUCCESS');
export const gotErrorLoadingSearchResults = createAction('FEED_SEARCH_ERROR');
export const updatedSearchResultsFeed = createAction('SEARCH_RESULTS_UPDATED'); // to indicate that data has been displayed successfully on UI

// export const gotErrorAuthenticatingUser = createAction('USER_AUTH_ERROR');

// export const gettingUserData = createAction('USER_DATA_CHECK');
// export const gotUserExists = createAction('USER_DATA_EXISTS');
// export const gotErrorCheckingUserData = createAction('USER_DATA_CHECK_ERROR');

// export const creatingUser = createAction('USER_DATA_INITIALIZING');
// export const createdUser = createAction('USER_DATA_INITIALIZED');
// export const gotErrorCreatingUser = createAction('USER_DATA_INIT_ERROR');

const initialState = { posts: dummy_post_list };

const feedReducer = createReducer(initialState, {
	// [authenticatingUser.type]: (state) => {
	// 	console.log('Auth Process Started');
	// 	state.authing = true;
	// },
	// [authenticatedUser.type]: (state, action) => {
	// 	state.authing = false;
	// 	state.user = action.payload.newUser;
	// 	state.userProfileId = action.payload.newUser.profileId;
	// },
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

export default feedReducer;
