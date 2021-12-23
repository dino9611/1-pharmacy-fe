import React, { useState } from 'react';
import CustomTextInput from '../../UI/utility/CustomTextInput';
import useAxios from '../../../hooks/useAxios';
import SearchBar from '../../controller/SearchBar';
import AddMedicineIngredients from './AddMedicineIngredients';
import { Form, Formik } from 'formik';

function EditProduct(props) {
	const [body, setBody] = useState();
	const [materials, setMaterials] = useState([]);

	const { response, loading, error } = useAxios({
		method: 'put',
		url: `http://localhost:2001/inventory/${props.id}`,
		body,
	});

	console.log(response);

	const onFormSubmitHandler = async (value) => {
		value.materials = materials;
		setBody(value);
		setMaterials([]);
	};

	return (
		<div>
			<Formik
				enableReinitialize
				initialValues={{
					name: props.name,
					price: props.price,
					description: props.description,
					serving: props.serving,
					quantityInStock: props.quantityInStock,
				}}
				onSubmit={onFormSubmitHandler} //required to pass in data from form input
			>
				<Form>
					<CustomTextInput
						className='form-control'
						classLabel='form-label'
						label='name'
						name='name'
						type='text'
						placeholder='name'
					/>
					<CustomTextInput
						className='form-control'
						classLabel='form-label'
						label='price'
						type='number'
						name='price'
						placeholder='price'
					/>
					<CustomTextInput
						className='form-control'
						classLabel='form-label'
						label='Description'
						name='description'
						type='text'
						placeholder='description'
					/>
					<CustomTextInput
						className='form-control'
						classLabel='form-label'
						label='serving'
						type='number'
						name='serving'
						placeholder='serving'
					/>
					<CustomTextInput
						className='form-control'
						classLabel='form-label'
						label='Quantity in Stock'
						type='number'
						name='quantityInStock'
						placeholder='Quantity in Stock'
					/>
					<button type='submit' className='btn btn-primary my-3'>
						submit
					</button>
				</Form>
			</Formik>
			{/* <AddMedicineIngredients onAddMaterial={onAddMaterialHandler} />
			{materials.map((element) => {
				return (
					<button id={element.id} onClick={onClickDelete} value={element.name}>
						{element.name}
					</button>
				);
			})} */}
		</div>
	);
}

export default EditProduct;
