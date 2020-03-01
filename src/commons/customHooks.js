import { useState, useEffect } from 'react';

export function useWindowWidth(arg = 'mobile') {
	const [width, setWidth] = useState(window.innerWidth);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);

		window.addEventListener('resize', handleResize);
		if (width < 480) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobile, width]);

	switch (arg) {
		case 'mobile':
			return isMobile;
		case 'width':
			return width;
		case 'debug': {
			console.log('window width is: ', width);
			isMobile
				? console.log('window is on a mobile: ', isMobile)
				: console.log('window is on a PC: ', !isMobile);
			return [width, isMobile];
		}
		case 'info': {
			console.group('WINDOW_SIZE_HOOK');
			console.log('[Hey Devs] You can pass args as follows:');
			console.log("['mobile' - returns boolean isMobile]");
			console.log("['width' - returns int windowWidth]");
			console.log("['debug' - returns [windowWidth, isMobile] + logs the values]");
			console.log("['info' - returns default and console logs the options");
			console.log('[empty - returns [windowWidth, isMobile] - default case]');
			console.groupEnd();
			return [width, isMobile];
		}
		default:
			return [width, isMobile];
	}
}

export const useCheckUserLogin = (user, lastLogin) => {
	const oneDay = 86400000;
	let sinceYesterday = Date.now() - oneDay;
	if (user) {
		if (lastLogin > sinceYesterday) return user;
	}
	return false;
};
