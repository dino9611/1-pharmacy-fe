import { Field, Form, Formik, useField } from 'formik';
import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import useAxios from '../../../hooks/useAxios';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';
import * as Yup from 'yup';

function AddMedicineIngredients(props) {
	const [input, setInput] = useState('');
	const [isError, setIsError] = useState(false);
	let { response, error, loading } = useAxios({
		url:
			'http://localhost:2001/inventory/medicines' +
			`/?name=${input ? input : 'a'}`,
		method: 'get',
	});

	useEffect(() => {
		if (response) {
			let data = response.map((element) => {
				return element.name;
			});

			let checked = data.find((element) => element === input);

			if (data && checked) {
				setIsError(false);
			} else {
				setIsError(true);
			}
		}
		console.log(isError);
	}, [input]);

	const formSubmitHandler = (value, { setSubmitting, resetForm }) => {
		props.onAddMaterial({ ...value, name: input });
	};
	return (
		<div>
			<Formik
				initialValues={{
					quantity: '',
					UnitId: 1,
				}}
				validationSchema={Yup.object().shape({
					quantity: Yup.number()
						.min(1, ' minimum of 1')
						.max(10, 'maximum of 10')
						.required('Required'),
					UnitId: Yup.number()
						.oneOf([1, 2, 3, 4], 'invalid option')
						.required('Required'),
				})}
				onSubmit={formSubmitHandler}
			>
				<Form>
					<Field
						type='text'
						name='name'
						list='names'
						id='name'
						onChange={(event) => setInput(event.target.value)}
						value={input}
					/>
					<datalist id='names'>
						{response &&
							response.map((element) => {
								return <option value={element.name}>{element.name}</option>;
							})}
					</datalist>
					{isError && <h6 style={{ color: 'red' }}>Material not found</h6>}
					<CustomTextInput
						label='quantity'
						name='quantity'
						type='text'
						placeholder='quantity'
					/>

					<CustomSelect label='UnitId' name='UnitId'>
						<option value={1}>mg</option>
						<option value={2}>gr</option>
						<option value={3}>ml</option>
						<option value={4}>cl</option>
					</CustomSelect>
					<button type='submit' disabled={isError ? true : false}>
						Submit
					</button>
				</Form>
			</Formik>
		</div>
	);
}

// id and name from state object cannot

export default AddMedicineIngredients;
