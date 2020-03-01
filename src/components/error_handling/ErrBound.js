import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
	static propTypes = {
		prop: PropTypes.func,
	};

	state = { error: null };

	static getDerivedStateFromError(error) {
		return { error };
	}

	render() {
		const { error } = this.state;
		if (error) {
			return <this.props.FallbackComponent error={error} />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;

//#region example
// function Bomb() {
//   throw new Error('💥 CABOOM 💥')
//   return null
// }
// function App() {
//   const [explode, setExplode] = React.useState(false)
//   return (
//     <div>
//       <div>
//         <button onClick={() => setExplode(true)}>💣</button>
//       </div>
//       <div>
//         <ErrorBoundary FallbackComponent={ErrorFallback}>
//           {explode ? <Bomb /> : 'Push the button Max!'}
//         </ErrorBoundary>
//       </div>
//     </div>
//   )
// }
//#endregion
