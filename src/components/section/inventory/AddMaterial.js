import React, { useState } from 'react';
import * as Yup from 'yup';
import useAxios from '../../../hooks/useAxios';
import CustomForm from '../../UI/utility/CustomForm';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';

function AddMaterial(props) {
	const [body, setBody] = useState();
	let { response, error, loading } = useAxios({
		url: 'http://localhost:2001/material',
		method: 'post',
		body: body,
	});

	const onFormSubmitHandler = (value) => {
		setBody(value);
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
				loading={loading}
				error={error}
				buttonName='submit'
			>
				<h1>Add Material</h1>
				<CustomTextInput
					label='name'
					name='name'
					type='text'
					placeholder='name'
				/>
				<CustomTextInput
					label='price'
					type='number'
					name='price'
					placeholder='price'
				/>
				<CustomTextInput
					label='bottle_quantity'
					name='bottle_quantity'
					type='number'
					placeholder='bottle quantity'
				/>
				<CustomTextInput
					label='quantity_per_bottle'
					type='number'
					name='quantity_per_bottle'
					placeholder='Quantity per Bottle'
				/>
				<CustomTextInput
					label='stock_quantity'
					type='number'
					name='stock_quantity'
					placeholder='Stock Quantity'
				/>
				<CustomSelect label='UnitId' name='UnitId'>
					<option value={1}>mg</option>
					<option value={2}>gr</option>
					<option value={3}>ml</option>
					<option value={4}>cl</option>
				</CustomSelect>
				<button type='submit'>submit</button>
			</CustomForm>
		</div>
	);
}

export default AddMaterial;
