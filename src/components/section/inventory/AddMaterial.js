import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import useAxios from '../../../hooks/useAxios';
import CustomForm from '../../UI/utility/CustomForm';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';
import { API_URL } from '../../../constants/api';

function AddMaterial(props) {
	const [body, setBody] = useState();

	const { response, loading, error } = useAxios({
		method: 'post',
		url: `${API_URL}/material`,
		body,
	});

	const onFormSubmitHandler = async (value) => {
		setBody(value);
		props.onAddMaterial();
	};

	return (
		<div>
			<CustomForm
				initial={{
					name: '',
					price: '',
					bottle_quantity: '',
					quantity_per_bottle: '',
					stock_quantity: '',
					UnitId: 1,
				}}
				validate={Yup.object().shape({
					name: Yup.string()
						.min(5, 'Must be 5 character or more')
						.max(25, 'must be less than 25 character')
						.required('Required'),
					price: Yup.number()
						.min(10000, 'Must be more than 10.000')
						.max(1000000, 'Must be less than 1.000.000')
						.required('Required'),
					bottle_quantity: Yup.number()
						.min(100, 'Must be more than 100')
						.max(1000, 'Must be less than 1000')
						.required('Required'),
					quantity_per_bottle: Yup.number()
						.min(100, 'Must be more than 100')
						.max(1000, 'Must be less than 1000')
						.required('Required'),
					stock_quantity: Yup.number()
						.max(1000000, 'Must be less than bottle * quantity per bottle')
						.required('Required'),
					UnitId: Yup.number()
						.oneOf([1, 2, 3, 4], 'invalid option')
						.required('Required'),
				})}
				submitHandler={onFormSubmitHandler} //required to pass in data from form input
				buttonName='submit'
			>
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
						label='UnitId'
						name='UnitId'
					>
						<option value={1}>mg</option>
						<option value={2}>gr</option>
						<option value={3}>ml</option>
						<option value={4}>cl</option>
					</CustomSelect>
				</div>
				<button type='submit' className='btn btn-primary'>
					submit
				</button>
			</CustomForm>
			{props.children}
		</div>
	);
}

export default AddMaterial;
