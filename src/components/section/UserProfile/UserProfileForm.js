import React, { useDebugValue } from 'react';
import useAxios from '../../../hooks/useAxios';
import CustomForm from '../../UI/utility/CustomForm';
import CustomSelect from '../../UI/utility/CustomSelect';
import CustomTextInput from '../../UI/utility/CustomTextInput';

function UserProfileForm(props) {
	const initialValue = {
		firstName: props.firstName,
		lastName: props.lastName,
		gender: props.gender,
		birthdate: props.birthdate,
		address: props.address,
		avatar: props.avatar,
		email: props.email,
		isVerified: props.isVerified,
		username: props.username,
	};

	const formSubmitHandler = (value) => {
		console.log(value);
	};

	return (
		<div>
			{props && (
				<CustomForm initial={initialValue} submitHandler={formSubmitHandler}>
					<h1>User Profile</h1>
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
