import axios from 'axios';
import React, { useDebugValue, useState } from 'react';
import UploadImage from '../../controller/UploadImage';
import CustomForm from '../../UI/utility/CustomForm';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';

function UserProfileForm(props) {
	const [image, setImage] = useState(`${props.avatar}`);

	const initialValue = {
		firstName: props.firstName,
		lastName: props.lastName,
		gender: props.gender,
		birthdate: props.birthdate,
		address: props.address,
		email: props.email,
		username: props.username,
	};
	const formSubmitHandler = (value) => {
		console.log(value);
		axios.put(`http://localhost:2001/profile/info/${props.id}`, value);
		props.onEditSubmitHandler();
	};

	return (
		<div>
			{props && (
				<div>
					<div className='d-flex flex-row align-items-center justify-content-center'>
						<UploadImage
							uploadUrl={(value) => setImage(value)}
							avatar={`https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg`}
						/>
					</div>
					<CustomForm initial={initialValue} submitHandler={formSubmitHandler}>
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
			)}
		</div>
	);
}

export default UserProfileForm;
