import React, { Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { useDispatch, useSelector } from 'react-redux';

// import EuiCombo from '../eui/Combobox';
import MUICombobox from '../mui/MUICombobox';
import auth from '../../store/actions/auth';

import logoalpha from '../../res/logo/quirk_v01.svg';
// import ErrorBoundary from '../error_handling/ErrBound';
// import ErrorFallback from '../error_handling/ErrorFallback';

// Sample Client side search with reachUi Combobox
// function useCityMatch(term) {
// 	const throttledTerm = useThrottle(term, 100);
// 	return useMemo(
// 		() =>
// 			term.trim() === ''
// 				? null
// 				: matchSorter(cities, term, {
// 						keys: [(item) => `${item.city}, ${item.state}`],
// 				  }),
// 		[throttledTerm]
// 	);
// }

function Navbar(props) {
	const { actRoutes } = props;
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [query, setQuery] = useState('');
	// const results = useCityMatch(term);
	const handleChange = (event) => setQuery(event.target.value);

	const reachCombobox = (
		<Combobox className='searchbar'>
			<ComboboxInput
				aria-labelledby='demo'
				className='search_input'
				placeholder='🔎 | Quirk Search'
				onChange={handleChange}
				value={query}
			/>
			<ComboboxPopover className='search_prompt_container'>
				<ComboboxList className='search_prompt_list' aria-labelledby='demo'>
					<ComboboxOption value='user>' />
					<ComboboxOption value='channel>' />
					<ComboboxOption value='Profile' />
					<ComboboxOption value='Dashboard' />
					<ComboboxOption value='Learning' />
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);

	const newComboBox = <MUICombobox />;

	const activeSearchBar = true ? newComboBox : reachCombobox;
	return (
		<header className='nav_header'>
			<Suspense delay={`10ms`} fallback={<h4>Loading the Cool stuff</h4>}>
				<Link to='/'>
					<img
						src={logoalpha}
						height='32px'
						width='auto'
						alt='logo for quirk network'
						className='app_logo'
						loading='lazy'
						decoding='async'
					/>
				</Link>
			</Suspense>
			<div className='searchbar'>{activeSearchBar}</div>
			<nav className='navbar_main'>
				<ul className='navbar_links'>
					{actRoutes.length !== 0 &&
						actRoutes.map((route) => (
							<li key={route.path}>
								<Link to={route.path}>{route.name}</Link>
							</li>
						))}
					{/* <li>
						<Link to='/'>Feed</Link>
					</li>
					<li>
						<Link to='/discover'>Discover</Link>
					</li>
					<li>
						<Link to='/me'>Me</Link>
					</li> */}
				</ul>
				{user ? (
					<span className='user_name'>{user.nameGiven}</span>
				) : (
					<button
						className='nav_btn_login'
						onClick={async () => {
							// alert('Login Process Initializing')
							console.log('Login Process Initializing');
							dispatch(auth());
						}}>
						Login with Google
					</button>
				)}
			</nav>
		</header>
	);
}

Navbar.propTypes = {
	actRoutes: PropTypes.arrayOf(PropTypes.object),
};

export default Navbar;
