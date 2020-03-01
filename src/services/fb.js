import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';
import '@firebase/messaging';
// import '@firebase/firebase-messaging';

// const CLIENT_ID = `653698835199-v2hcro3d7oq5m432h86h556v4cd3eqeu.apps.googleusercontent.com`;
// const CLIENT_SECRET = `XR8PBZpXFCXZvXjox-FIFULX`;

const firebaseConfig = {
	apiKey: 'AIzaSyAVaOE5ywj_K5HtX5VRvE-Q-v9g4LEBa30',
	authDomain: 'quirknetto.firebaseapp.com',
	databaseURL: 'https://quirknetto.firebaseio.com',
	projectId: 'quirknetto',
	storageBucket: 'quirknetto.appspot.com',
	messagingSenderId: '158635164020',
	appId: '1:158635164020:web:c710e4682244938a5fac21',
	measurementId: 'G-4C9DZQ40F3',
};

const app = firebase.initializeApp(firebaseConfig);
// console.log('App data is: ', app);
// console.log('App name is: ', app.name);

/* #### User Authentication Related Code #### */
export const getAuthRef = () => {
	return app.auth();
};

// export const authRef = app.auth()
export const gProvider = new firebase.auth.GoogleAuthProvider();

/** Function to get the detials of the user that's currently logged in*/
export const getUser = () => {
	return app.auth().currentUser;
};

// getAuthRef().onAuthStateChanged((user) => {
// 	if (user) {
// 		// User is signed in.
// 		let displayName = user.displayName;
// 		let email = user.email;
// 		let emailVerified = user.emailVerified;
// 		let photoURL = user.photoURL;
// 		// let isAnonymous = user.isAnonymous;
// 		let uid = user.uid;
// 		let providerData = user.providerData;
// 		console.group('User Data is: ', user);
// 		console.log('UID: ', uid);
// 		console.log('Name: ', displayName);
// 		console.log('Email: ', email);
// 		console.log('Is Email Verified: ', emailVerified);
// 		console.log('User Avartar Url: ', photoURL);
// 		console.log('Provider Data: ', providerData);
// 		console.groupEnd();

// 		// ...
// 	} else {
// 		// User is signed out.
// 		// ...
// 	}
// });

/* ---- End of User Authentication Related Code ---- */

/* #### FireStore DB Related Code #### */
const db = app.firestore();

// export const testRef = db.doc("test/test01")
// export const worksV1DocRef = db.doc("workshops/v1")
export const usersCollectionRef = db.collection('users');
export const feedbackCollectionRef = db.collection('feedback');
export const userDocRef = db.doc(`users/${getUser()}`);

/* ---- End of FireStore DB Related Code ---- */

export default app;
