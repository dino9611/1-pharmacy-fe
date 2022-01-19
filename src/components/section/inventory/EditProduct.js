import { Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../constants/api';
import useAxios from '../../../hooks/useAxios';
import UploadImage from '../../controller/UploadImage';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';

function EditMaterial(props) {
	const [body, setBody] = useState();
	const [image, setImage] = useState(props.image);

	const { response, loading, error } = useAxios({
		method: 'put',
		url: `${API_URL}/inventory/${props.id}`,
		body,
	});

	const onFormSubmitHandler = (value) => {
		const data = { ...value, image };
		console.log(data);
		// setBody(data);
	};

	const initialValue = {
		name: props.name,
		price: props.price,
		description: props.description,
	};
	console.log(props.description);
	return (
		<div>
			<UploadImage
				folder='medicines'
				avatar={props.image}
				uploadUrl={(value) => setImage(value)}
			/>
			<Formik
				enableReinitialize
				initialValues={initialValue}
				onSubmit={onFormSubmitHandler} //required to pass in data from form input
			>
				<Form>
					<div className='row'>
						<div className='form-outline mb-4'>
							<CustomTextInput
								className='form-control'
								classLabel='form-label'
								label='name'
								name='name'
								type='text'
								placeholder='name'
							/>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col mb-3'>
							<CustomTextInput
								className='form-control'
								classLabel='form-label'
								label='price'
								type='number'
								name='price'
								placeholder='price'
							/>
						</div>
					</div>
					<div className='row justify-content-center mb-4'>
						<div className='col mb-3'>
							<CustomTextInput
								className='form-control'
								classLabel='form-label'
								label='description'
								type='number'
								name='description'
								placeholder='description'
							/>
						</div>
					</div>
					<div className='row justify-content-center mb-4'>
						<CustomSelect
							className='form-select'
							classLabel='form-label'
							label='Unit'
							name='UnitId'
						>
							<option value={1}>mg</option>
							<option value={2}>gr</option>
							<option value={3}>ml</option>
							<option value={4}>cl</option>
						</CustomSelect>
					</div>
					<button
						type='submit'
						className='btn btn-primary'
						onClick={props.onEditHandler}
					>
						Submit
					</button>
				</Form>
			</Formik>
