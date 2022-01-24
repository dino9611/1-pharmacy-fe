import axios from 'axios';
import React, { useDebugValue, useState } from 'react';
import { API_URL } from '../../../constants/api';
import UploadImage from '../../controller/UploadImage';
import CustomForm from '../../UI/utility/CustomForm';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';

function UserProfileForm(props) {
	const [image, setImage] = useState(`${props.avatar}`);

	const formSubmitHandler = async (input) => {
		const data = await axios.put(`${API_URL}/profile/info/${props.id}`, {
			...input,
			avatar: image,
		});
		console.log(data);
		props.onEditSubmitHandler();
	};

	if (props) {
		return (
			<div>
				<div>
					<div className='d-flex flex-row align-items-center justify-content-center'>
						<UploadImage
							className='img-thumbnail rounded-circle'
							uploadUrl={(value) => setImage(value)}
							avatar={image}
						/>
					</div>
					<CustomForm
						initial={{
							firstName: props.firstName,
							lastName: props.lastName,
							gender: props.gender,
							birthdate: props.birthdate,
							address: props.address,
							email: props.email,
							username: props.username,
						}}
						submitHandler={formSubmitHandler}
					>
						<CustomTextInput
							className='form-control'
							classLabel='form-label'
							label='username'
							name='username'
							type='text'
						/>
						<CustomTextInput
							className='form-control'
							classLabel='form-label'
							label='first name'
							name='firstName'
							type='text'
						/>
						<CustomTextInput
							className='form-control'
							classLabel='form-label'
							label='last name'
							name='lastName'
							type='text'
						/>

						<CustomSelect
							className='form-select'
							classLabel='form-label'
							label='gender'
							name='gender'
						>
							<option selected={!props.gender && 'selected'}></option>
							<option
								value={'male'}
								selected={props.gender === 'male' && 'selected'}
							>
								male
							</option>
							<option
								value={'female'}
								selected={props.gender === 'female' && 'selected'}
							>
								female
							</option>
						</CustomSelect>
						<CustomTextInput
							className='form-control'
							classLabel='form-label'
							label='email'
							name='email'
							type='email'
						/>
						<CustomTextInput
							className='form-control'
							classLabel='form-label'
							label='birthdate'
							name='birthdate'
							type='date'
						/>
						<CustomTextInput
							className='form-control'
							classLabel='form-label'
							label='address'
							name='address'
							type='text'
						/>
						<button type='submit' className='btn btn-primary'>
							Submit
						</button>
					</CustomForm>
				</div>
			</div>
		);
	} else {
		return <h1>Loading ...</h1>;
	}
}

export default UserProfileForm;
