import axios from 'axios';
import React, { useDebugValue, useState } from 'react';
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
				<CustomForm initial={initialValue} submitHandler={formSubmitHandler}>
					<CustomTextInput label='username' name='username' type='text' />
					<CustomTextInput label='first name' name='firstName' type='text' />
					<CustomTextInput label='last name' name='lastName' type='text' />
					<CustomSelect label='gender' name='gender'>
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
					<CustomTextInput label='email' name='email' type='email' />
					<CustomTextInput label='birthdate' name='birthdate' type='datetime' />
					<CustomTextInput label='address' name='address' type='text' />
					<button type='submit'>Submit</button>
				</CustomForm>
			)}
		</div>
	);
}

export default UserProfileForm;
