import axios from 'axios';
import React from 'react';
import { API_URL } from '../../../constants/api';
import UploadImage from '../../controller/UploadImage';

function Prescriptions() {
	const uploadHandler = (value) => {
		axios
			.post(API_URL + '/custom/', {
				image: value,
				UserId: 1,
				status: 1,
			})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	let styles = {};

	return (
		<div style={{ width: '50%', height: '50%' }}>
			<UploadImage
				className='m-0 p-2 bg-secondary'
				uploadUrl={uploadHandler}
				style={styles}
			/>
		</div>
	);
}

export default Prescriptions;
