import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import useAxios from '../../hooks/useAxios';
import { useState } from 'react/cjs/react.development';

const Basic = () => {
	const [input, setInput] = useState('');
	let { response, error, loading } = useAxios({
		url:
			'http://localhost:2001/inventory/medicines' +
			`/?name=${input ? input : 'a'}`,
		method: 'get',
	});

	const onSubmitHandler = (values) => {
		console.log(values);
		console.log(input);
		console.log({ ...values, materials: input });
	};

	return (
		<div>
			<h1>Sign Up</h1>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					designation: '',
				}}
				onSubmit={onSubmitHandler}
			>
				<Form>
					<label htmlFor='firstName'>First Name</label>
					<Field id='firstName' name='firstName' placeholder='Jane' />

					<label htmlFor='lastName'>Last Name</label>
					<Field id='lastName' name='lastName' placeholder='Doe' />

					<label htmlFor='email'>Email</label>
					<Field
						id='email'
						name='email'
						placeholder='jane@acme.com'
						type='email'
					/>
					<label htmlFor='friend'>Friend</label>
					<Field
						type='text'
						name='designation'
						list='designations'
						id='designation'
						onChange={(event) => setInput(event.target.value)}
						value={input}
					/>
					<datalist id='designations'>
						{response &&
							response.map((element) => {
								return <option value={element.name}>{element.name}</option>;
							})}
					</datalist>
					<button type='submit'>Submit</button>
				</Form>
			</Formik>
		</div>
	);
};

export default Basic;
