import React, { useState } from 'react';
import CustomForm from '../../UI/utility/CustomForm';
import CustomTextInput from '../../UI/utility/CustomTextInput';
import useAxios from '../../../hooks/useAxios';
import AddMedicineIngredients from './AddMedicineIngredients';
import UploadImage from '../../controller/UploadImage';

function EditProduct(props) {
	const [body, setBody] = useState();
	const [materials, setMaterials] = useState(props.materialList);
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
		<div className='d-flex'>
			<div className='col-3 ms-4'>
				<UploadImage
					uploadUrl={(value) => setImage(value)}
					avatar={props.image}
					folder='product'
					className='img-thumbnail'
				/>
			</div>
			<div className='col-4 ms-4'>
				<CustomForm
					initial={{
						name: props.name,
						price: props.price,
						description: props.description,
						serving: props.serving,
						quantityInStock: props.quantityInStock,
						isDeleted: false,
					}}
					submitHandler={onFormSubmitHandler} //required to pass in data from form input
					buttonName='submit'
					className=''
				>
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
			</div>
			<div className='col-4 ms-4'>
				<AddMedicineIngredients onAddMaterial={onAddMaterialHandler} />
				{materials.map((element) => {
					return (
						<button
							id={element.id}
							value={element.name}
							onClick={() => console.log(element)}
						>
							{element.name}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default EditProduct;
