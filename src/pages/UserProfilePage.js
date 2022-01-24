import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditProfileModal from '../components/controller/EditProfileModal';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import { API_URL } from '../constants/api';
import useAxios from '../hooks/useAxios';
import useDidUpdate from '../hooks/useDidUpdate';

function UserProfilePage() {
	const [reload, setReload] = useState(false);
	const { id } = useSelector((state) => {
		return {
			id: state.auth.id,
		};
	});

	let { response } = useAxios({
		url: `${API_URL}/profile/${id}`, //id params will change from user auth
		method: 'get',
	});

	useDidUpdate(() => {
		console.log('reload');
		setReload(false);
	}, reload);

	const x = 0;
	const y = 30;
	const styles = {
		transform: `translate(${x}%, ${y}%)`,
		borderRadius: '10',
		border: '2px solid gray',
	};

	if (id === 0) return <h1>User not found....</h1>;

	if (response) {
		return (
			<div>
				<MarketplaceNavbar showVisible/>
				{response && (
					<div className='container rounded bg-white p-2' style={styles}>
						<div className='row'>
							<div className='col-md-5'>
								<div className='d-flex flex-column align-item-center text-center p-3 py-5'>
									<div>
										<img
											alt=''
											className='rounded m-4'
											width='300em'
											src={
												response.avatar
													? response.avatar
													: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
											}
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
										id={id} // will change to id from auth
										firstName={response.firstName}
										lastName={response.lastName}
										gender={response.gender}
										birthdate={response.birthdate}
										address={response.address}
										username={response.username}
										email={response.email}
										avatar={
											response.avatar
												? response.avatar
												: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
										}
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
											{response.birthdate ? (
												response.birthdate.split('T')[0]
											) : (
												<></>
											)}
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
	} else {
		return <h1>loading ...</h1>;
	}
}

export default UserProfilePage;
