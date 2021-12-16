import React, { useState } from 'react';
import CustomForm from '../../UI/utility/CustomForm';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';
import * as Yup from 'yup';
import useAxios from '../../../hooks/useAxios';
import SearchBar from '../../controller/SearchBar';
import AddMedicineIngredients from './AddMedicineIngredients';

function AddInventory(props) {
	const [body, setBody] = useState();
	const [materials, setMaterials] = useState([]);
	const [addMaterial, setAddMaterial] = useState(false);
	let { response, error, loading } = useAxios({
		url: 'http://localhost:2001/inventory',
		method: 'post',
		body,
	});

	const onFormSubmitHandler = (value) => {
		console.log(value);
		setBody(JSON.stringify(value));
	};
	const onAddMaterialHandler = (value) => {
		const output = [...materials, value];
		setMaterials(output);
		console.log(materials);
	};
	return (
		<div>
			<CustomForm
				initial={{
					name: '',
					price: '',
					description: '',
					image:
						'https://www.therecoveryvillage.com/wp-content/uploads/2020/06/Oxycodone-and-Mental-Health-Disorders.jpg',
					serving: '',
					quantityInStock: '',
					isDeleted: false,
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
					description: Yup.string()
						.min(20, 'Must be 5 character or more')
						.max(255, 'must be less than 25 character')
						.required('Required'),
					serving: Yup.number()
						.min(1, 'Must be more than 1')
						.max(4, 'Must be less than 4')
						.required('Required'),
					quantityInStock: Yup.number()
						.min(1, 'Must be more than 1')
						.max(1000, 'Must be less than 1000')
						.required('Required'),
				})}
				submitHandler={onFormSubmitHandler} //required to pass in data from form input
				loading={loading}
				error={error}
				buttonName='submit'
			>
				<h1>Add Product</h1>
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
					label='Description'
					name='description'
					type='text'
					placeholder='description'
				/>
				<CustomTextInput
					label='serving'
					type='number'
					name='serving'
					placeholder='serving'
				/>
				<CustomTextInput
					label='Quantity in Stock'
					type='number'
					name='quantityInStock'
					placeholder='Quantity in Stock'
				/>
				<button type='submit'>submit</button>
			</CustomForm>
			<button onClick={() => setAddMaterial(true)}>Add Material</button>
			{addMaterial && <AddMedicineIngredients />}
			{materials.length > 0 &&
				materials.map((element) => {
					<ul>
						<li>element.name</li>
					</ul>;
				})}
		</div>
	);
}

export default AddInventory;
