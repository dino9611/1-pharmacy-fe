import { Field } from 'formik';
import React from 'react';
import { useState } from 'react/cjs/react.development';
import useAxios from '../../../hooks/useAxios';
import CustomForm from '../../UI/utility/CustomForm';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';

function AddMedicineIngredients(props) {
	const [input, setInput] = useState('');
	let { response, error, loading } = useAxios({
		url:
			'http://localhost:2001/inventory/medicines' +
			`/?name=${input ? input : 'a'}`,
		method: 'get',
	});

	const formSubmitHandler = (value, event) => {
		console.log(value);
		event.preventDefault();
		// props.onAddMaterial(value);
	};
	return (
		<div>
			<CustomForm
				initial={{
					name: '',
					quantity: '',
					UnitId: 1,
				}}
				submitHandler={formSubmitHandler}
				buttonName='add'
			>
				{/* <Field name='name' value={input} /> */}

				<Field
					list='materialName'
					id='materialName'
					name='name'
					// value={input}
					onChange={(event, value) => setInput(value)}
				/>
				<datalist id='materialName'>
					{response &&
						response.map((element) => {
							<option
								value={element.name}
								onClick={(event, value) => setInput(value)}
							/>;
						})}
				</datalist>
				<CustomTextInput
					label='quantity'
					name='quantity'
					type='number'
					placeholder='quantity'
				/>
				<CustomSelect label='UnitId' name='UnitId'>
					<option value={1}>mg</option>
					<option value={2}>gr</option>
					<option value={3}>ml</option>
					<option value={4}>cl</option>
				</CustomSelect>
				<button type='submit'>add</button>
			</CustomForm>
		</div>
	);
}

// id and name from state object cannot

export default AddMedicineIngredients;
