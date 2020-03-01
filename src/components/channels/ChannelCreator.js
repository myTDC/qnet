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
	const userId = useSelector((state) => state.user.uid);
	const [channelTypeList, setChannelTypeList] = useState(dummy_channels);

	return (
		<div>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<section className='post_writer'>
					<Formik
						initialValues={{
							creator_id: userId,
							type: 'text',
							name: '',
							description: '',
							img_src: '',
						}}
						validationSchema={Yup.object({
							creator_id: Yup.string().required(),
							name: Yup.string()
								.min(5)
								.required(),
							description: Yup.string(),
							type: Yup.object({ value: Yup.string().required() }),
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
								<div className='post_content_main'>
									<FastField
										name='post_message'
										as={TextareaAutosize}
										aria-label='minimum height'
										rowsMin={5}
										className='post_input_area'
										placeholder="What's on your mind?"
									/>
								</div>
								<div className='post_content_img'>
									<i
										className='material-icons'
										style={{ fontSize: '24px', filter: 'opacity(.5)' }}>
										add_photo_alternate
									</i>
									<Field
										name='post_img_src'
										type='text'
										// as={TextField}
										className='post_img_src'
										placeholder='Got any images? https://{image_url}'
									/>
								</div>
								<div className='post_writer_controls'>
									<div className='post_writer_sourcer'>
										<Field
											type='text'
											name='post_source'
											label='Source:'
											size='small'
											className='post_input_source'
											placeholder='https://www.source.url'
											as={TextField}
										/>
									</div>
									<div className='post_writer_locator'>
										{
											//#region Custom composed Formik Field and MUI form Control + Select
											<Selector
												name='post_channel'
												type='select'
												className='post_input_source'
												placeholder='Posting In'
												opts={channelTypeList}
											/>
											//#endregion
										}
									</div>
									<button
										className='post_btn_submit'
										disabled={!!props.isSubmitting}
										type='submit'>
										Post it!
									</button>
								</div>
								{(props.errors.post_message || props.errors.post_channel) && (
									<div className='post_errors'>
										{props.errors.post_message && (
											<p>{props.errors.post_message}</p>
										)}
										{props.errors.post_channel && (
											<p>
												Uh-oh! Looks like you forgot to select the target
												channel for your post.
											</p>
										)}
										{/* {props.errors.post_message || props.errors.post_channel} */}
									</div>
								)}
								<ScreenDebugger
									source='PostWriter.js > Formik props'
									values={props}
									isOpen={false}
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
	const [isAvailable, setisAvailable] = useState(false);

	console.log('ChannelCreator.js > Channel name is availaible? ', isAvailable);
	return (
		<div className='channel_creator_container'>
			Hey {props.user ? props.user.nameGiven : 'user'}! I am the channel creator
			<br />
			<br />
			<secttion className='channel_crator_readme'>
				Here's how you can create a new discussion channel.
				<ol className='channel_creator_steps'>
					<li>input the desired name.</li>
					<li>click on check availaibility.</li>
					<li>get a modal dialog to confirm the creation.</li>
					<li>of the chose discussion channel.</li>
				</ol>
			</secttion>
			<ChannelCreatorForm />
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
