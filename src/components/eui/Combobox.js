import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import { EuiComboBox } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';

const dummy_optionsArray = [
	{
		label: 'Titan',
		'data-test-subj': 'titanOption',
	},
	{
		label: 'Enceladus',
	},
	{
		label: 'Mimas',
	},
	{
		label: 'Dione',
	},
	{
		label: 'Iapetus',
	},
	{
		label: 'Phoebe',
	},
	{
		label: 'Rhea',
	},
	{
		label:
			"Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
	},
	{
		label: 'Tethys',
	},
	{
		label: 'Hyperion',
	},
];

const Combobox = (props) => {
	const [presetQueries, setpresetQueries] = useState(
		props.preset_opts ? props.preset_opts : dummy_optionsArray
	);
	const [comboQuery, setcomboQuery] = useState([]);
	const handleComboChange = (selectedOptions) =>
		setcomboQuery([...comboQuery, selectedOptions]);

	const onCreateOption = (searchValue, flattenedOptions) => {
		const normalizedSearchValue = searchValue.trim().toLowerCase();

		if (!normalizedSearchValue) {
			return;
		}

		const newOption = {
			label: searchValue,
		};

		// Create the option if it doesn't exist.
		if (
			flattenedOptions.findIndex(
				(option) => option.label.trim().toLowerCase() === normalizedSearchValue
			) === -1
		) {
			setpresetQueries([...presetQueries, newOption]);
		}

		// Select the option.
		handleComboChange(newOption);
	};

	return (
		<div>
			<EuiComboBox
				placeholder='🗲Bolt Search'
				options={presetQueries}
				selectedOptions={comboQuery}
				onChange={handleComboChange}
				onCreateOption={onCreateOption}
				isClearable={true}
			/>
		</div>
	);
};

Combobox.propTypes = {};

export default Combobox;
