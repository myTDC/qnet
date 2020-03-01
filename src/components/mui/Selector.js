import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core/';

const Selector = (props) => {
	const [
		field,
		// meta
	] = useField(props);
	// console.log('Field Props are: ', field);
	const { placeholder, opts } = props;
	return (
		<FormControl
			// variant='outlined'
			className={props.className}>
			<InputLabel id='demo-simple-select-filled-label'>
				{placeholder}
			</InputLabel>
			<Select
				labelId='demo-simple-select-filled-label'
				id='demo-simple-select-filled'
				{...field}
				// name={field.name}
				// value={field.value}
				// onChange={field.handleChange}
				// {...props}
				autoWidth>
				{opts &&
					opts.map((opt, index) => (
						<MenuItem
							key={index}
							name={`${field.name}.${index}.value`}
							value={opt}>
							{opt.label}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
};

Selector.propTypes = {
	name: PropTypes.string.isRequired,
};

export default Selector;
