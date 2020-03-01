import { batch } from 'react-redux';
import { getAuthRef, gProvider, usersCollectionRef } from '../../services/fb';

import {
	authenticatingUser,
	authenticatedUser,
	gotErrorAuthenticatingUser,
} from '../reducers/auth';

import { getUserData } from '../actions/user';

// const getUserAccess = (user) => {
// 	const userWithAccess = null;
// 	return [user, userWithAccess];
// };

const authWithGoogle = () => {
	console.log('Starting Authentication Process');
	let curAuth = null;
	return (dispatch) => {
		dispatch(authenticatingUser()); //
		curAuth = getAuthRef();
		//console.log('SingedIn! ; AuthRef is: ', curAuth);
		curAuth
			.signInWithPopup(gProvider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				// let token = result.credential.accessToken;
				// console.log("SingedIn! ; Response is: ", result) // console.log("SingedIn! ; User Info: ", result.user)
				const user = {
					// The signed-in user info.\
					locale: result.additionalUserInfo.profile.locale,
					profileId: result.additionalUserInfo.profile.id,
					uid: result.user.uid,
					nameFull: result.user.displayName,
					nameGiven: result.additionalUserInfo.profile.given_name,
					nameFamily: result.additionalUserInfo.profile.family_name,
					email: result.user.email,
					phoneNo: result.user.phoneNumber,
					photoUrl: result.user.photoURL,
					emailVerified: result.user.emailVerified,
				};

				const userSessionExtras = {
					uid: result.user.uid,
					isAnonymous: result.user.isAnonymous,
					isNew: result.additionalUserInfo.isNewUser,
					refToken: result.user.refreshToken,
					token: result.credential.accessToken, // This gives you a Google Access Token. You can use it to access the Google API.
				};

				console.log('SingedIn!; User is: ', user); //const user = getAuthRef().currentUser

				batch(() => {
					//batching dispatches to improve state update perf
					dispatch(
						authenticatedUser({
							newUser: user,
							sessionStuff: userSessionExtras,
						})
					); //dispatch(authSuccessful(user))
					dispatch(getUserData(user)); //check user exists? getData:createUser

					// `/invoices/${newInvoice.id}`
				});
			})
			.catch((error) => {
				const authError = {
					errorCode: error.code,
					errorMessage: error.message,
					email: error.email,
					credential: error.credential,
				};
				console.group('Encountered Auth_Error');
				console.log('Error Code: ', authError.errorCode);
				console.log('With Message: ', authError.errorMessage);
				console.log('For Email: ', authError.email); // The email of the user's account used.
				console.log('using Credential: ', authError.credential); // The firebase.auth.AuthCredential type that was used.
				console.groupEnd();

				if (authError.errorCode === 'auth/web-storage-unsupported') {
					alert('Login Error! Please enable 3rd party cookies to login');
				}

				dispatch(gotErrorAuthenticatingUser({ error: authError }));
			});
	};
};

export const signOut = () => {
	getAuthRef
		.signOut()
		.then(function() {
			// Sign-out successful.
		})
		.catch(function(error) {
			// An error happened.
		});
};

export default authWithGoogle;
