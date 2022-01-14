import React, { useState } from 'react';
import CustomForm from '../../UI/utility/CustomForm';
import CustomTextInput from '../../UI/utility/CustomTextInput';
import * as Yup from 'yup';
import useAxios from '../../../hooks/useAxios';
import AddMedicineIngredients from './AddMedicineIngredients';
import UploadImage from '../../controller/UploadImage';

function AddInventory(props) {
	const [body, setBody] = useState();
	const [materials, setMaterials] = useState([]);
	const [image, setImage] = useState('');

	const { response, loading, error } = useAxios({
		method: 'post',
		url: 'http://localhost:2001/inventory',
		body,
	});

	const onFormSubmitHandler = async (value) => {
		value.materials = materials;
		value.image = image;
		setBody(value);
		setMaterials([]);
		props.onAddProduct();
	};
	const onAddMaterialHandler = (value) => {
		const output = [...materials, value];
		setMaterials(output);
	};

	return (
		<div>
			<CustomForm
				initial={{
					name: '',
					price: '',
					description: '',
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
				buttonName='submit'
				className=''
			>
				<UploadImage
					uploadUrl={(value) => setImage(value)}
					avatar='data:image/png;base64,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'
					folder='product'
				/>
				<CustomTextInput
					className='form-control'
					label='name'
					name='name'
					type='text'
					placeholder='name'
				/>
				<CustomTextInput
					className='form-control'
					label='price'
					type='number'
					name='price'
					placeholder='price'
				/>
				<CustomTextInput
					className='form-control'
					label='Description'
					name='description'
					type='text'
					placeholder='description'
				/>
				<CustomTextInput
					className='form-control'
					label='serving'
					type='number'
					name='serving'
					placeholder='serving'
				/>
				<CustomTextInput
					className='form-control'
					label='Quantity in Stock'
					type='number'
					name='quantityInStock'
					placeholder='Quantity in Stock'
				/>

				<button className='btn btn-primary' type='submit'>
					submit
				</button>
			</CustomForm>
			<AddMedicineIngredients onAddMaterial={onAddMaterialHandler} />
			{materials.map((element) => {
				return (
					<button id={element.id} value={element.name}>
						{element.name}
					</button>
				);
			})}
		</div>
	);
}

export default AddInventory;
