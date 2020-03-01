//#region Core Libs
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//#endregion

//#region Styles, Images, Res
import './styles/app.css';
//#endregion

//#region Custom Components
import Navbar from './components/nav/Navbar';
import { getAuthRef } from './services/fb';
import { getUserData } from './store/actions/user';
//#endregion

//#region Lazily Loaded components
const Home = lazy(() => import('./pages/LandingPublic'));
const Profile = lazy(() => import('./pages/Profile'));
const Discover = lazy(() => import('./pages/Discover'));
const About = lazy(() => import('./pages/About'));
const ProfileCreator = lazy(() => import('./pages/ProfileCreator'));
const Channel = lazy(() => import('./components/channels/Channel'));
const ChannelCreator = lazy(() =>
	import('./components/channels/ChannelCreator')
);
const Post = lazy(() => import('./components/feed/PostFull'));
//#endregion

//#region Local components -> candiates to be refactored
function NotFound(props) {
	const navigate = useNavigate();
	console.log('App.js/NotFound > Nav object: ', JSON.stringify(navigate));
	return (
		<div className='not_found_container'>
			<h3>Welcome to the void - to the great abyss of nothingness.</h3>
			{/* You tried to come here from: {JSON.stringify(history)} */}
			<button onClick={() => navigate(-1)}>Go back</button>
		</div>
	);
}
//#endregion

//#region App Routes
const routes_no_auth = [
	{
		name: 'Feed',
		path: '/',
		element: <Home />,
	},
	{
		name: 'Discover',
		path: '/discover',
		element: <Discover />,
	},
	{
		name: 'About',
		path: '/about',
		element: <About />,
	},
];

const routes_first_auth = [
	...routes_no_auth,
	{
		name: 'Me',
		path: '/firstLogin',
		element: <ProfileCreator />,
	},
];

const routes_returning_auth = [
	...routes_no_auth,
	{
		name: 'Me',
		path: '/me',
		element: <Profile />,
	},
];
//#endregion

function App() {
	const dispatch = useDispatch();
	let isNew = useSelector((state) => state.user.isFirstTimeUser);
	const authUser = useSelector((state) => state.auth.user);
	const activeUser = useSelector((state) => state.user);

	const [activeRoutes, setActiveRoutes] = useState(routes_no_auth);

	// const ROUTES = {
	// 	info: 'Did you know? ...',
	// 	warning: 'Be careful here ...',
	// 	error: 'Something went wrong ...',
	// };

	useEffect(() => {
		getAuthRef().onAuthStateChanged((user) => {
			if (activeUser.profile_id === null && user) {
				// Dispatch action toget user data matching auth from users collection from fbfs
				// User is signed in.
				let uid = user.uid;
				let email = user.email;
				let displayName = user.displayName;
				// let emailVerified = user.emailVerified;
				// let photoURL = user.photoURL;
				// let isAnonymous = user.isAnonymous;
				// let providerData = user.providerData;
				console.group('Source: App.js: ');
				// console.group('User Data is: ', user);
				console.log('UID: ', uid);
				console.log('Name: ', displayName);
				console.log('Email: ', email);
				// console.log('Is Email Verified: ', emailVerified);
				// console.log('User Avartar Url: ', photoURL);
				// console.log('Provider Data: ', providerData);
				console.groupEnd();

				// dispatch(getUserData(uid, email));
			} else if (activeUser.profile_id !== null && user) {
				console.log(
					'App.js/onAuthStateChanged > Authenticated user:',
					user.email,
					' | Existing User: ',
					activeUser.email_id
				);
				user.email === activeUser.email_id
					? console.log('user Already Logged in')
					: console.log('Logging out the ActiveUser');
			} else {
				// User is signed out.
				// ...
				// dispatch action to set active user as null which in turn should change auth states and only fetch cached posts from fbfs
			}
		});

		// return () => {
		// 	cleanup
		// };
	}, [activeUser, authUser, isNew]);
	useEffect(() => {
		if (activeUser && !isNew) {
			console.log('From App.js/  User logged in and is returning user');
			setActiveRoutes(routes_returning_auth);
		} else if (activeUser && isNew) {
			console.log('From App.js/  User logged in and is first time user');
			setActiveRoutes(routes_first_auth);
		} else {
			console.log('From App.js/  User logged out');
			setActiveRoutes(routes_no_auth);
		}
		// return () => {
		// 	cleanup
		// };
	}, [activeUser, authUser, isNew]);

	return (
		<div className='app'>
			<Navbar actRoutes={activeRoutes} />
			<div className='app_container'>
				<Link to='/firstLogin'>Profile Creator</Link> |{' '}
				<Link to='/channels/create'>Channel Creator</Link>
				<Suspense
					delay='50ms'
					fallback={
						<h4 className='fallback_main'>Loading some Cool Quirks</h4>
					}>
					<Routes>
						{activeRoutes.map((comp) => (
							<Route key={comp.path} path={comp.path} element={comp.element} />
						))}
						<Route path='/channels' element={<Discover />} />
						<Route path='channels/:cid' element={<Channel />} />
						<Route path='/posts' element={<Discover />} />
						<Route path='/posts/:pid' element={<Post />} />
						<Route path='/firstLogin' element={<ProfileCreator />} />
						<Route path='/channels/create' element={<ChannelCreator />} />
						<Route path='/*' element={<NotFound />} />

						{/* <Route path='/about' element={<About />} />
						<Route path='/me' element={<Profile />} />
						<Route path='/discover/*' element={<Discover />} />wwwwww
						<Route path='/firstLogin' element={<ProfileCreator />} /> 
						<Route
							path='users/:userID/firstLogin'
							element={<ProfileCreator />}
						/>*/}
					</Routes>
				</Suspense>
			</div>
		</div>
	);
}

export default App;
