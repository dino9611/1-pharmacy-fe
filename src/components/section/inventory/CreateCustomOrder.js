import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import useAxios from '../../../hooks/useAxios';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';
import * as Yup from 'yup';
import useDebounce from '../../../hooks/useDebounce';
import { API_URL } from '../../../constants/api';

function CustomOrder(props) {
	const [input, setInput] = useState('');
	const [isError, setIsError] = useState(false);
	const [initial, setInitial] = useState({
		quantity: 0,
		serving: 0,
		UnitId: 1,
	});
	let { debounceValue } = useDebounce({ value: input, delay: 400 });

	let search = useAxios({
		url:
			`${API_URL}/material/search` +
			`/?name=${debounceValue ? debounceValue : 'a'}`,
		method: 'get',
	});
	console.log(search.response);

	useEffect(() => {
		if (search.response) {
			let data = search.response.map((element) => {
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
		props.onAddMaterial({ ...value, name: input });
		setInitial({
			quantity: '',
			UnitId: 1,
		});
		setInput('');
	};

	return (
		<div>
			<div className='row text-start'>
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
						<label className='label bold'>Material</label>
						<Field
							className='form-control'
							type='search'
							name='name'
							list='names'
							id='name'
							onChange={(event) => setInput(event.target.value)}
							value={input}
							autocomplete='off'
						/>
						<datalist id='names'>
							{search.response &&
								search.response.map((element) => {
									return <option value={element.name}>{element.name}</option>;
								})}
						</datalist>
						<CustomTextInput
							className='form-control'
							label='quantity'
							name='quantity'
							type='number'
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
						<div className='col mb-3 mt-3'>
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
			</div>
			<div className='row d-flex flex-col align-items-start p-1'>
				<h6 className='col-2'>Material list:</h6>
				<div className='col-9'>
					{props.material.map((element) => {
						return <button>{element.name}</button>;
					})}
				</div>
			</div>
		</div>
	);
}

// id and name from state object cannot

export default CustomOrder;
