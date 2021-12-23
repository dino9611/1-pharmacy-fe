import React from 'react';
import UserProfileForm from '../components/section/UserProfile/UserProfileForm';
import useAxios from '../hooks/useAxios';

function UserProfilePage() {
	let { response, error, loading } = useAxios({
		url: 'http://localhost:2001/profile/3',
		method: 'get',
	});
	console.log(response);
	return (
		<div>
			<UserProfileForm {...response} />
		</div>
	);
}

export default UserProfilePage;
