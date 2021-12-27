import React, { useState } from 'react';
import { storage } from '../../firebase/index';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function UploadImage(props) {
	const [image, setImage] = useState(null);
	const [percentage, setPercentage] = useState(0);
	const [err, setErr] = useState(null);

	const changeHandler = (event) => {
		if (event.target.files[0]) {
			setImage(event.target.files[0]);
		}
	};

	const uploadHandler = () => {
		if (!image) return;
		const storageRef = ref(storage, `/profile/${image.name}`); // change profile to props folder to put in the image
		const uploadTask = uploadBytesResumable(storageRef, image);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
				);
				setPercentage(progress);
			},
			(err) => {
				setErr(true);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					props.uploadUrl(url);
				}); // url to download the image will be stored to database
			},
		);
	};

	return (
		<div>
			<input type='file' onChange={changeHandler} />
			<button onClick={uploadHandler}>Upload</button>
			<div class='progress'>
				<div
					class='progress-bar'
					role='progressbar'
					style={{ width: `${percentage}%` }}
					aria-valuenow='25'
					aria-valuemin='0'
					aria-valuemax='100'
				></div>
			</div>
			{err && <h6 style={{ color: 'red' }}>Error !!</h6>}
		</div>
	);
}

export default UploadImage;
