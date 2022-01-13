import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import useAxios from '../../../hooks/useAxios';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';
import * as Yup from 'yup';
import useDebounce from '../../../hooks/useDebounce';

function AddMedicineIngredients(props) {
	const [input, setInput] = useState('');
	const [isError, setIsError] = useState(false);
	const [show, setShow] = useState(false);
	const [initial, setInitial] = useState({
		quantity: '',
		UnitId: 1,
	});

	let { debounceValue } = useDebounce({ value: input, delay: 400 });

	let { response, error, loading } = useAxios({
		url:
			'http://localhost:2001/material/search' +
			`/?name=${debounceValue ? debounceValue : 'a'}`,
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
	}, [debounceValue]);

	const formSubmitHandler = (value) => {
		console.log({ ...value, name: input });
		props.onAddMaterial({ ...value, name: input });
		setInitial({
			quantity: '',
			UnitId: 1,
		});
		setInput('');
	};
	return (
		<div>
			{!show && (
				<button onClick={() => setShow(true)} className='btn btn-primary'>
					Add Material
				</button>
			)}
			{show && (
				<Formik
					enableReinitialize
					initialValues={initial}
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
						<label>Material</label>
						<Field
							className='form-control'
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
							className='form-control'
							label='quantity'
							name='quantity'
							type='text'
							placeholder='quantity'
						/>

						<CustomSelect
							className='form-control mb-3'
							label='UnitId'
							name='UnitId'
						>
							<option value={1}>mg</option>
							<option value={2}>gr</option>
							<option value={3}>ml</option>
							<option value={4}>cl</option>
						</CustomSelect>
						<div className='col mb-3'>
							<button
								className='btn btn-secondary'
								onClick={() => setShow(false)}
							>
								Close
							</button>
							<button
								className='btn btn-primary'
								type='submit'
								disabled={isError ? true : false}
							>
								Add
							</button>
						</div>
					</Form>
				</Formik>
			)}
		</div>
	);
}

// id and name from state object cannot

export default AddMedicineIngredients;
