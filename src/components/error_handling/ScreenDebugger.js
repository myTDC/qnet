import React from 'react';
import PropTypes from 'prop-types';

const debuggerStyles = {
	container: {
		margin: '8px 0',
		maxWidth: '640px',
		display: 'block',
		fontSize: '.8rem',
		textAlign: 'start',
		backgroundColor: '#eaeaea',
	},
	header: {
		backgroundColor: '#121212',
		padding: '1vh',
		color: '#eee',
		borderRadius: '8px 8px 0 0',
	},
	data: {
		padding: '1vh',
		fontFamily: 'Roboto Mono',
		fontSize: '.7rem',
		lineHeight: '1.6em',
	},
};

const ScreenDebugger = (props) => {
	return (
		<details style={debuggerStyles.container} open={props.isOpen}>
			<summary style={debuggerStyles.header}>Source: {props.source}</summary>
			<pre style={debuggerStyles.data}>
				{JSON.stringify(props.values, null, 2)}
			</pre>
		</details>
	);
};

ScreenDebugger.propTypes = {
	source: PropTypes.string.isRequired,
	values: PropTypes.object.isRequired,
	isOpen: PropTypes.bool,
};

ScreenDebugger.defaultProps = {
	source: 'React App > Active Component',
	isOpen: true,
};

export default ScreenDebugger;
