import { batch } from 'react-redux';
import { getAuthRef, gProvider, usersCollectionRef } from '../../services/fb';
import {
	gettingUserData,
	gotUserData,
	errorGettingUserData,
	creatingUserData,
	createdUserData,
	errorCreatingUserData,
	userSkippedProfileCreation,
} from '../reducers/user';

//#region TODOs
// 1. Listen for auth state changes
// 2. Get data from Auth and try to fetch data from Collections.users.uid; Fetching = true;
//   if fetch is successful send the incoming data to the reducer, update store and the UI; fetching = false, fetched at = Date.now()
//   else if fetch failed with error message = doc does not exist then => dispatch function to create user and save it to collections.users.uid;
//   upon receiving result from creating user update redux store in userReducer.
//   batched with it when the userid exists create a channel by dispatching action for channel creator. channel creator should be based on user profile id but should also be linked to the 'alias_name' provided by the user on the signup screen.

//   creating = true.
//   else log the error and show error message
//#endregion

//#region Auth state changed lsitener
// getAuthRef().onAuthStateChanged((user) => {
// 	if (user) {
// 		// User is signed in.
// 		let displayName = user.displayName;
// 		let email = user.email;
// 		let emailVerified = user.emailVerified;
// 		let photoURL = user.photoURL;
// 		// let isAnonymous = user.isAnonymous;
// 		let uid = user.uid;
// 		// let providerData = user.providerData;
// 		console.group('Source: ', 'store/actions/user');
// 		console.log('UID: ', uid);
// 		console.log('Name: ', displayName);
// 		console.log('Email: ', email);
// 		console.log('Is Email Verified: ', emailVerified);
// 		console.log('User Avartar Url: ', photoURL);
// 		// console.log('Provider Data: ', providerData);
// 		console.groupEnd();

// 		// ...
// 	} else {
// 		// User is signed out.
// 		// ...
// 	}
// });
//#endregion

export const getUserData = (user) => {
	return (dispatch) => {
		dispatch(gettingUserData());
		usersCollectionRef
			.where('email', '==', user.email)
			.get()
			.then((querySnapshot) => {
				if (querySnapshot) {
					querySnapshot.forEach((doc) => {
						const incomingData = doc.data();
						console.log(
							'User Exists with id: ',
							doc.id,
							' & has data: ',
							incomingData
						);
						dispatch(gotUserData({ user: incomingData }));
					});
				} else {
					dispatch(createUser(user));
				}
			})
			.catch((error) => {
				console.error('Error checking user ref: ', error);
				dispatch(errorGettingUserData({ error_code: error }));
			});
	};
};

const setUserAccess = (user) => {
	const userWithAccess = {
		...user,
		...{ role: 'authenticated', access: 'regsitered' },
	};
	console.log('Access Specified User is', userWithAccess);
	return userWithAccess;
};

const createUser = (newUser) => {
	return async (dispatch) => {
		dispatch(creatingUserData());
		//TODO: add user roles and accesses
		const user = setUserAccess(newUser);
		console.log(
			"User Doesn't Exist. Creating User with Data: ",
			user,
			' at ',
			usersCollectionRef
		);
		usersCollectionRef
			.add(user)
			.then((docRef) => {
				console.log('User Created at Doc ID: ', docRef.id);
				dispatch(createdUserData());
			})
			.catch((error) => {
				console.error('Error adding User document: ', error);
				dispatch(errorCreatingUserData({ error_code: error }));
			});
	};
};

export const skipProfileCreation = () => {
	return (dispatch) => dispatch(userSkippedProfileCreation());
};

const createPersonalChannelOnAuth = (udata) => {
	return {
		type: 'CREATE_PERSONAL_CHANNEL',
		payload: {
			uid: '',
		},
	};
};
