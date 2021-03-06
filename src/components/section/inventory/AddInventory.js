import React, { useState } from 'react';
import CustomForm from '../../UI/utility/CustomForm';
import CustomTextInput from '../../UI/utility/CustomTextInput';
import * as Yup from 'yup';
import useAxios from '../../../hooks/useAxios';
import AddMedicineIngredients from './AddMedicineIngredients';
import UploadImage from '../../controller/UploadImage';
import { API_URL } from '../../../constants/api';

function AddInventory(props) {
	const [body, setBody] = useState();
	const [materials, setMaterials] = useState([]);
	const [image, setImage] = useState(
		props.image ||
			'https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png',
	);

	const { response, loading, error } = useAxios({
		method: 'post',
		url: `${API_URL}/inventory`,
		body,
	});

	const onFormSubmitHandler = async (value) => {
		value.materials = materials;
		value.image = image;
		setBody(value);
		setMaterials([]);
		setImage(
			'https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png',
		);
		props.onAddProduct();
	};
	const onAddMaterialHandler = (value) => {
		const output = [...materials, value];
		setMaterials(output);
	};

	return (
		<div>
			<UploadImage
				className='img-thumbnail'
				uploadUrl={(value) => setImage(value)}
				avatar={image}
			/>
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
				<UploadImage uploadUrl={(value) => setImage(value)} />
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
					<button
						id={element.id}
						value={element.name}
						className='btn btn-primary'
					>
						{element.name}
					</button>
				);
			})}
		</div>
	);
}

export default AddInventory;
