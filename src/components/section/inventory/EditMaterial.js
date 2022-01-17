import { Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../constants/api';
import useAxios from '../../../hooks/useAxios';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';

function EditMaterial(props) {
	const [body, setBody] = useState();

	const { response, loading, error } = useAxios({
		method: 'put',
		url: `${API_URL}/material/${props.id}`,
		body,
	});

	const onFormSubmitHandler = (value) => {
		setBody(value);
	};

	const initialValue = {
		name: props.name,
		price: props.price,
		bottle_quantity: props.bottle_quantity,
		quantity_per_bottle: props.quantity_per_bottle,
		stock_quantity: props.stock_quantity,
	};

	return (
		<div>
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
						<div className='col mb-3'>
							<CustomTextInput
								className='form-control'
								classLabel='form-label'
								label='Bottle Quantity'
								name='bottle_quantity'
								type='number'
								placeholder='bottle quantity'
							/>
							Bottle
						</div>
					</div>
					<div className='row justify-content-center mb-4'>
						<div className='col mb-3'>
							<CustomTextInput
								className='form-control'
								classLabel='form-label'
								label='Quantity per Bottle'
								type='number'
								name='quantity_per_bottle'
								placeholder='Quantity per Bottle'
							/>
						</div>
						<div className='col mb-3'>
							<CustomTextInput
								className='form-control'
								classLabel='form-label'
								label='Stock Quantity'
								type='number'
								name='stock_quantity'
								placeholder='Stock Quantity'
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
		</div>
	);
}

export default EditMaterial;
