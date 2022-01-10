import React, { useEffect, useState } from 'react';
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
		const storageRef = ref(storage, `/${props.folder}/${image.name}`); // change profile to props folder to put in the image
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

	useEffect(() => {
		return uploadHandler();
	}, [image]);

	return (
		<div className='container align-items-center justify-content-center'>
			<label for='imageUpload'>
				<img className='rounded-circle w-75 mx-5 ' src={props.avatar} />
			</label>
			<input
				type='file'
				onChange={changeHandler}
				id='imageUpload'
				style={{ opacity: 0, zIndex: -1 }}
			/>
			{/* <div class='progress'>
				<div
					class='progress-bar'
					role='progressbar'
					style={{ width: `${percentage}%` }}
					aria-valuenow='25'
					aria-valuemin='0'
					aria-valuemax='100'
				></div>
			</div> */}
			{err && <h6 style={{ color: 'red' }}>Error !!</h6>}
		</div>
	);
}

// set upload when user proceed with edit profilex

export default UploadImage;
