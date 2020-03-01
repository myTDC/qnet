import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	useDispatch,
	useSelector,
	// useSelector
} from 'react-redux';

import {
	Formik,
	Form,
	Field,
	// useField,
	FastField,
} from 'formik';

import * as Yup from 'yup';

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// import {
// 	TextareaAutosize,
// 	// Select,
// 	// MenuItem,
// 	// FormControl,
// 	// InputLabel,
// 	TextField,
// } from '@material-ui/core/';

import './channelCreator.css';

import ScreenDebugger from '../error_handling/ScreenDebugger';
import ErrorBoundary from '../error_handling/ErrBound';
import ErrorFallback from '../error_handling/ErrorFallback';
import Selector from '../mui/Selector';

// import React from 'react'
// import PropTypes from 'prop-types'

const dummy_channels = [
	{ id: '1', label: 'Educational', value: 'educational', url: `xyz/c/self` },
	{ id: '2', label: 'Startups', value: 'startups', url: `xyz/c/self` },
	{
		id: '3',
		label: 'Entertainment',
		value: 'entertainment',
		url: `xyz/c/self`,
	},
	{ id: '4', label: 'Lifestyle', value: 'lifestyle', url: `xyz/c/self` },
	{ id: '5', label: 'Product', value: 'product', url: `xyz/c/self` },
];

const ChannelCreatorForm = (props) => {
	const dispatch = useDispatch();
	const { user } = props;
	const [channelTypeList, setChannelTypeList] = useState(dummy_channels);

	return (
		<div>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<section className='channel_creator_form'>
					<Formik
						initialValues={{
							creator_id: user.uid !== null ? user.uid : '',
							type: '',
							name: '',
							description: '',
							img_src: '',
						}}
						validationSchema={Yup.object({
							creator_id: Yup.string().required(),
							type: Yup.object({ value: Yup.string().required() }),
							name: Yup.string()
								.min(5)
								.required(),
							description: Yup.string(),
							img_src: Yup.string(),
						})}
						onSubmit={(values, { setSubmitting }) => {
							console.log('submitted post is: ' + JSON.stringify(values));
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
							}, 400);

							// console.log('submitted post is: ' + post_content);
							// alert(
							// 	'submitted post: "' +
							// 		post_content +
							// 		'" with source: ' +
							// 		post_source
							// );
							// dispatch(() =>
							// 	savePosttoStore({
							// 		// content: post_content,
							// 		// source: post_source,
							// 		// location: post_location,
							// 	})
							// );
							// resetPost();
						}}>
						{(props) => (
							<Form>
								<div className='channel_creator_main'>
									<h4 className='channel_creator_heading'>
										Hey {user.uid !== null ? user.nameGiven : 'user'}! Let's
										start a discussion channel
									</h4>
									<Selector
										name='type'
										type='select'
										className='post_input_source'
										placeholder='Channel Category'
										opts={channelTypeList}
									/>
									<FastField
										name='name'
										type='text'
										as={TextField}
										className='post_img_src'
										placeholder='Topic of the channel'
									/>
									<FastField
										name='description'
										rows='1'
										as={TextareaAutosize}
										aria-label='minimum height'
										className='post_input_area'
										placeholder="What is this channel about? (don't worry you can change it later)"
									/>
									<div className='channel_creator_img'>
										<i
											className='material-icons'
											style={{ fontSize: '24px', filter: 'opacity(.5)' }}>
											add_photo_alternate
										</i>
										<Field
											name='img_src'
											type='text'
											as={TextField}
											className='post_img_src'
											placeholder='Got a picture for channel dp? https://{image_url}'
										/>
									</div>
								</div>
								<div className='channel_creator_controls'>
									<button
										className='channel_creator_btn_submit'
										disabled={!!props.isSubmitting}
										type='submit'>
										Post it!
									</button>
								</div>
								{(props.errors.name || props.errors.type) && (
									<ul className='channel_creator_errors'>
										{props.errors.name && (
											<li>> Error in channel name: {props.errors.name}</li>
										)}
										{props.errors.type && (
											<li>
												> Error in channel type:{' '}
												{JSON.stringify(props.errors.type)}
											</li>
										)}
										{/* {props.errors.post_message || props.errors.post_channel} */}
									</ul>
								)}
								<ScreenDebugger
									source='PostWriter.js > Formik props'
									values={props}
									// isOpen={false}
								/>
							</Form>
						)}
					</Formik>
				</section>
			</ErrorBoundary>
		</div>
	);
};

ChannelCreatorForm.propTypes = {};

// export default ChannelCreatorForm

function ChannelCreator(props) {
	const user = useSelector((state) => state.user);
	const [isAvailable, setisAvailable] = useState(false);

	console.log('ChannelCreator.js > Channel name is availaible? ', isAvailable);
	return (
		<div className='channel_creator_container'>
			Hey {props.user ? props.user.nameGiven : 'user'}! I am the channel creator
			<br />
			<br />
			<section className='channel_crator_readme'>
				Here's how you can create a new discussion channel.
				<ol className='channel_creator_steps'>
					<li>input the desired name.</li>
					<li>click on check availaibility.</li>
					<li>get a modal dialog to confirm the creation.</li>
					<li>of the chose discussion channel.</li>
				</ol>
			</section>
			<ChannelCreatorForm user={user} />
		</div>
	);
}

ChannelCreator.propTypes = {
	user: PropTypes.string,
	with_modal: PropTypes.bool,
};

ChannelCreator.defaultProps = {
	with_modal: false,
};

export default ChannelCreator;
