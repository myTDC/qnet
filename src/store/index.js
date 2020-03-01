import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import throttle from 'lodash/throttle';
import auth from './reducers/auth';
import feed from './reducers/feed';
import user from './reducers/user';
import postWriter from './reducers/postWriter';
import suggestions from './reducers/suggestions';

// import admin from './reducers/admin';
// import feedback from './reducers/feedback';
// import tools from './reducers/tools';
// import users from './reducers/users';

//#region Persisting store in localstorage
export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('storedState');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		console.log(
			'[Red/Index] -> [loadState()] Error Getting Serilaized State',
			err
		);
		return undefined;
	}
};

export const saveState = (incoming_state) => {
	try {
		console.log('Saved state is: ', incoming_state);
		const serializedState = JSON.stringify(incoming_state);
		localStorage.setItem('storedState', serializedState);
	} catch (err) {
		console.log(
			'[Red/Index] -> [setState()] Error Setting Serilaized State',
			err
		);
	}
};
//#endregion

/**
 * Loading Initial stage from the latest state stored in the local storage of the browser
 * In case of no stored state, null values are used and are replaced inside the individual reduced files.
 */

function configureAppStore(preloadedState) {
	const initState = loadState();

	const rootReducer = {
		auth: auth,
		user: user,
		feed: feed,
		suggests: suggestions,
		postWriter: postWriter,
		// admin: admin,
		// feedback: feedback,
		// tools: tools,
		// users: users,
	};

	const store = configureStore({
		reducer: rootReducer,
		middleware: [logger, ...getDefaultMiddleware()],
		preloadedState: initState,
		// enhancers: [monitorReducersEnhancer]
	});
	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept(rootReducer, () => store.replaceReducer(rootReducer));
	}

	// store.subscribe(
	// 	throttle(() => {
	// 		// console.log(store.getState());
	// 		const currentState = store.getState();
	// 		console.log(
	// 			'dipalying current state befor epersisting data:',
	// 			currentState
	// 		);
	// 		const stateToPersist = {
	// 			feed: currentState.feed,
	// 			user: currentState.user,
	// 			suggests: currentState.suggests,
	// 		};
	// 		console.log('dipalying data to persist: ', stateToPersist);
	// 		saveState(stateToPersist);
	// 	}, 2000)
	// );

	return store;
}

export default configureAppStore;

// const store = configureStore({
// 	reducer: { ...rootReducer },
// 	middleware: [logger, ...getDefaultMiddleware()],
// 	preloadedState: initState,
// });

// // if (process.env.NODE_ENV === 'development' && module.hot) {
// // 	module.hot.accept('./rootReducer', () => {
// // 		const newRootReducer = rootReducer
// // 		store.replaceReducer(newRootReducer)
// // 	})
// // }

// store.subscribe(
// 	throttle(() => {
// 		const currentState = store.getState();
// 		saveState(currentState);
// 	}, 2000)
// );

// // if (process.env.NODE_ENV !== 'production' && module.hot) {
// //   module.hot.accept('./reducers', () => store.replaceReducer(auth))
// // }

// export default store;
