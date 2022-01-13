import React from 'react';

function UserProfile(props) {
	return (
		<div>

			

			{/* <CustomForm
				initial={{
					firstName: props.firstName,
					lastName: props.lastName,
					gender: props.gender,
					birthdate: props.birthdate.split('T')[0],
					address: props.address,
					avatar: props.avatar,
					email: props.email,
					isVerified: props.isVerified,
				}}
			>
				<h1>User Profile</h1>
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
				<CustomTextInput label='birthdate' name='birthdate' type='date' />
				<CustomTextInput label='address' name='address' type='text' />
			</CustomForm> */}
		</div>
	);
}

export default UserProfile;
