import React, { useState } from 'react';
import { storage } from '../../firebase/index';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function UploadImage(props) {
	const [image, setImage] = useState(null);
	const [percentage, setPercentage] = useState(0);

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
				console.log(err);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url)); // url to download the image will be stored to database
			},
		);
	};

	return (
		<div>
			<h1>Upload Image</h1>
			<input type='file' onChange={changeHandler} />
			<button onClick={uploadHandler}>Upload</button>
			<h3>Loading {percentage} %</h3>
		</div>
	);
}

export default UploadImage;
