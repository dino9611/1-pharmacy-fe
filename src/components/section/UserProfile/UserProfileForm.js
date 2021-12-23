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
			<div className='row gutters-sm'>
				<div className='col-md-4 mb-3'>
					<div className='card'>
						<div className='d-flex flex-column align-items-center text-center'>
							<img
								src={props.avatar}
								alt={props.firstName}
								className='rounded-circle'
								width='150'
							/>
							<div className='mt-3'>
								<h4>{props.firstName}</h4>
								<p className='text-secondary mb-1'>{props.email}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='col-md-8'>
				<div className='card mb-3'>
					<div className='card-body'>
						<div className='row'>
							<div className='col-sm-3'>
								<h6 className='mb-0'>Full Name</h6>
							</div>
							<div className='col-sm-9 text-secondary'>
								{props.firstName} {props.lastName}
							</div>
						</div>
						<div className='row'>
							<div className='col-sm-3'>
								<h6 className='mb-0'>Email</h6>
								<div className='col-sm-9 text-secondary'>{props.email}</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-sm-3'>
								<h6 className='mb-0'>Gender</h6>
								<div className='col-sm-9 text-secondary'>{props.gender}</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-sm-3'>
								<h6 className='mb-0'>birthdate</h6>
								<div className='col-sm-9 text-secondary'>
									{props.birthdate.split('T')[0]}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<button
					className='btn btn-primary'
					data-bs-toggle='modal'
					data-bs-target={`#editProfile`}
				>
					Edit
				</button>
				<div
					className='modal fade'
					id={`editProfile`}
					data-bs-backdrop='static'
					data-bs-keyboard='false'
					tabIndex='-1'
					aria-labelledby='staticBackdropLabel'
					aria-hidden='true'
				>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='staticBackdropLabel'>
									Edit Profile
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
								></button>
							</div>
							<div className='modal-body'>
								<CustomForm
									initial={initialValue}
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
									<div className='row'>
										<div className='col-sm-3'>
											<input
												className='form-check-input'
												type='radio'
												name='gender'
												value='male'
												id='male'
											/>
											<label className='form-check-label' for='male'>
												Male
											</label>
										</div>
										<div className='col-sm-3'>
											<input
												className='form-check-input'
												type='radio'
												name='gender'
												value='female'
												id='female'
											/>
											<label className='form-check-label' for='female'>
												Female
											</label>
										</div>
									</div>
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
										type='datetime'
									/>
									<CustomTextInput
										className='form-control'
										classLabel='form-label'
										label='address'
										name='address'
										type='text'
									/>
									<button type='submit' className='btn btn-primary my-3'>
										Submit
									</button>
								</CustomForm>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfileForm;
