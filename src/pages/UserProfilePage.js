import React, { useEffect, useState } from 'react';
import EditProfileModal from '../components/controller/EditProfileModal';
import UserProfileForm from '../components/section/UserProfile/UserProfileForm';
import NavbarUser from '../components/UI/utility/NavbarUser';
import useAxios from '../hooks/useAxios';

function UserProfilePage(props) {
	let [reload, setReload] = useState(false);

	let { response } = useAxios({
		url: 'http://localhost:2001/profile/5', //id params will change from user auth
		method: 'get',
	});

	useEffect(() => {
		return setReload(false);
	}, [reload]);
	return (
		<div>
			<NavbarUser />
			{response && (
				<div className='container rounded bg-white'>
					<div className='row'>
						<div className='col-md-5'>
							<div className='d-flex flex-column align-item-center text-center p-3 py-5'>
								<div>
									<img
										className='rounded-circle'
										width='150em'
										src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
									/>
								</div>
								<span className='font-weigth-bold'>{response.username}</span>
								<span className='text-black-50'>{response.email}</span>
							</div>
						</div>
						<div className='col-md-7 mt-5'>
							<div className='d-flex justify-content-between'>
								<h3>{response.username}'s Profile</h3>

								<EditProfileModal
									id={5} // will change to id from auth
									firstName={response.firstName}
									lastName={response.lastName}
									gender={response.gender}
									birthdate={response.birthdate}
									address={response.address}
									username={response.username}
									email={response.email}
									avatar={response.avatar}
									onSubmitReload={() => setReload(true)}
								/>
							</div>
							<div className='row mt-5 ps-3'>
								<div className='col-6'>
									<label className='row'>First Name</label>
									<h5 className='row mt-2'>{response.firstName}</h5>
								</div>
								<div className='col-6'>
									<label className='row'>Last Name</label>
									<h5 className='row mt-2'>{response.lastName}</h5>
								</div>
							</div>
							<div className='row mt-5 ps-3'>
								<div className='col-6'>
									<label className='row'>Gender</label>
									<h5 className='row mt-2'>{response.gender}</h5>
								</div>
								<div className='col-6'>
									<label className='row'>birthdate</label>
									<h5 className='row mt-2'>
										{response.birthdate.split('T')[0]}
									</h5>
								</div>
							</div>
							<div className='row mt-5 ps-3'>
								<div className='col'>
									<label className='row'>Address</label>
									<h5 className='row mt-2'>{response.address}</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default UserProfilePage;
