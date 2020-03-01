//#region libs
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import {
	useDispatch,
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

import {
	TextareaAutosize,
	// Select,
	// MenuItem,
	// FormControl,
	// InputLabel,
	TextField,
} from '@material-ui/core/';

//#endregion

//#region Local Components
import ErrorBoundary from '../error_handling/ErrBound';
import ErrorFallback from '../error_handling/ErrorFallback';
import ScreenDebugger from '../error_handling/ScreenDebugger';

import Selector from '../mui/Selector';
//#endregion

//#region store ops
import {
	savePosttoStore,
	publishPosttoDB,
} from '../../store/reducers/postWriter';

//#endregion

//#region styles & res
import './postWriter.css';
import userpic_default from '../../res/avatars/avatar_female_tshirt.svg';

//#endregion

// const QuirkSelect = (props) => {
// 	const [
// 		field,
// 		// meta
// 	] = useField(props);
// 	// console.log('Field Props are: ', field);
// 	const { placeholder, opts } = props;
// 	return (
// 		<FormControl
// 			// variant='outlined'
// 			className={props.className}>
// 			<InputLabel id='demo-simple-select-filled-label'>
// 				{placeholder}
// 			</InputLabel>
// 			<Select
// 				labelId='demo-simple-select-filled-label'
// 				id='demo-simple-select-filled'
// 				{...field}
// 				// name={field.name}
// 				// value={field.value}
// 				// onChange={field.handleChange}
// 				// {...props}
// 				autoWidth>
// 				{opts &&
// 					opts.map((opt, index) => (
// 						<MenuItem
// 							key={index}
// 							name={`${field.name}.${index}.value`}
// 							value={opt}>
// 							{opt.label}
// 						</MenuItem>
// 					))}
// 			</Select>
// 		</FormControl>
// 	);
// };

// const QuirkTextInput = (props) => {
// 	const [
// 		field,
// 		// meta
// 	] = useField(props);
// 	// console.log('Field Props are: ', field);
// 	const { placeholder, opts } = props;

// 	return (

// 	)
// };

const dummy_channels = [
	{ id: '1', label: 'Self', value: 'self', url: `xyz/c/self` },
	{ id: '2', label: 'Ch1', value: 'ch1', url: `xyz/c/self` },
	{ id: '3', label: 'Ch2', value: 'ch2', url: `xyz/c/self` },
	{ id: '4', label: 'Ch3', value: 'ch3', url: `xyz/c/self` },
];

function PostWriterWithAuth(props) {
	const dispatch = useDispatch();
	// const isSubmitting = useSelector((state) => state.postWriter.isPosting);
	const [isWriting, setisWriting] = useState(false);
	const [post_content, setPostContent] = useState('');
	const [post_source, setPostSource] = useState('');
	const [post_location, setPostLocation] = useState('');

	const [channelList, setChannelList] = useState(dummy_channels);

	const resetPost = () => {
		setisWriting(false);
		setPostContent('');
		setPostSource('');
	};

	// console.log('post content is: ' + post_content);

	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<section className='post_writer'>
				<Formik
					initialValues={{
						post_type: 'text',
						post_message: '',
						post_source: '',
						post_channel: '',
						post_img_src: '',
					}}
					validationSchema={Yup.object({
						post_type: Yup.string().required(),
						post_message: Yup.string()
							.min(5)
							.required(),
						post_channel: Yup.object({ value: Yup.string().required() }),
						// firstName: Yup.string()
						// 	.max(15, 'Must be 15 characters or less')
						// 	.required('Required'),
						// lastName: Yup.string()
						// 	.max(20, 'Must be 20 characters or less')
						// 	.required('Required'),
						// email: Yup.string()
						// 	.email('Invalid email address')
						// 	.required('Required'),
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
						dispatch(() =>
							savePosttoStore({
								content: post_content,
								source: post_source,
								location: post_location,
							})
						);
						resetPost();
					}}>
					{(props) => (
						<Form>
							<div className='post_content_main'>
								<img
									src={userpic_default}
									alt='displays active user avatar'
									className='user_avatar'
								/>
								<FastField
									name='post_message'
									as={TextareaAutosize}
									aria-label='minimum height'
									rowsMin={5}
									className='post_input_area'
									placeholder="What's on your mind?"
								/>
								{/* <TextareaAutosize
									aria-label='minimum height'
									rowsMin={4}
									className='post_input_area'
									placeholder="What's on your mind?"
									value={post_content}
									onFocus={() => setisWriting(true)}
									onBlur={() => setisWriting(false)}
									onChange={(val) => setPostContent(val.target.value)}
								/> */}
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
								{/* <TextareaAutosize
									aria-label='minimum height'
									rowsMin={4}
									className='post_input_area'
									placeholder="What's on your mind?"
									value={post_content}
									onFocus={() => setisWriting(true)}
									onBlur={() => setisWriting(false)}
									onChange={(val) => setPostContent(val.target.value)}
								/> */}
							</div>
							<div className='post_writer_controls'>
								<div className='post_writer_sourcer'>
									{/*
									<p className='post_source_indic'>source: </p>
									 <input
										type='text'
										className='post_input_source'
										placeholder='source url for reference'
										value={post_source}
										onChange={(val) => setPostSource(val.target.value)}
									/> */}
									<>
										{/* <p className='post_source_indic'>source: </p>
										<Field
											type='text'
											name='post_source'
											label='Source:'
											size='small'
											className='post_input_source'
											placeholder='https://www.source.url'
										/> */}
									</>
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
										//#region default html selector
										/* <p className='post_source_indic'>posting in: </p>
									<select
										name='channel'
										className='post_input_source'
										placeholder='Select target channel'
										value={post_location}
										onChange={(val) => setPostLocation(val.target.value)}>
										{channelList.length !== 0 &&
											channelList.map((opt) => (
												<option
													key={opt.id}
													value={opt.value}
													// name={`channel.${opt.index}.value`}
												>
													{opt.label}
												</option>
											))}
									</select> */
										//#endregion
									}
									{
										//#region Simple formik field using MUI Select
										// <>
										// 	<p className='post_source_indic'>posting in: </p>
										// 	<Field
										// 		name='channel'
										// 		type='select'
										// 		as={Select}
										// 		className='post_input_source'
										// 		placeholder='Select target channel'
										// 		autoWidth>
										// 		<MenuItem value=''>
										// 			<em>None</em>
										// 		</MenuItem>
										// 		{channelList.length !== 0 &&
										// 			channelList.map((opt) => (
										// 				<MenuItem
										// 					key={opt.id}
										// 					value={opt.value}
										// 					// name={`channel.${opt.index}.value`}
										// 				>
										// 					{opt.label}
										// 				</MenuItem>
										// 			))}
										// 	</Field>
										// </>
										//#endregion
									}
									{
										//#region Custom composed Formik Field and MUI form Control + Select
										<Selector
											name='post_channel'
											type='select'
											className='post_input_source'
											placeholder='Posting In'
											opts={channelList}
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
											Uh-oh! Looks like you forgot to select the target channel
											for your post.
										</p>
									)}
									{/* {props.errors.post_message || props.errors.post_channel} */}
								</div>
							)}
							<ScreenDebugger
								source='PostWriter.js > form field values'
								values={{
									'User is Writing?': isWriting,
									'Post Content': post_content,
									'where will it be posted': post_location,
									'Source Link to the info in post': post_source,
									// ...props.values,
								}}
								isOpen={false}
							/>
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
	);
}

PostWriterWithAuth.propTypes = {};

// export default PostWriterWithAuth

function PostWriterWithoutAuth(props) {
	return (
		<section className='post_writer'>
			<div className='write_access_denied'>
				Please log in or register to write posts.
			</div>
		</section>
	);
}

PostWriterWithoutAuth.propTypes = {};

// export default PostWriterWithoutAuth

function PostWriter(props) {
	const [
		isUserAuthenticated,
		// , setisUserAuthenticate
	] = useState(true);
	return (
		<div>
			{isUserAuthenticated ? <PostWriterWithAuth /> : <PostWriterWithoutAuth />}
		</div>
	);
}

PostWriter.propTypes = {};

export default PostWriter;
