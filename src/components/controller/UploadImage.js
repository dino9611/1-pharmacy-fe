import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/index';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function UploadImage(props) {
	const [avatar, setAvatar] = useState(props.avatar);
	const [newImage, setNewImage] = useState();
	const [image, setImage] = useState(null);
	const [err, setErr] = useState(null);

	const changeHandler = (event) => {
		if (event.target.files[0]) {
			setImage(event.target.files[0]);
		}
	};

	const uploadHandler = () => {
		if (!image) return;
		const name = new Date().toISOString();

		const storageRef = ref(storage, `/${props.folder}/${name}`); // change profile to props folder to put in the image
		const uploadTask = uploadBytesResumable(storageRef, image);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
				);
			},
			(err) => {
				setErr(true);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setNewImage(url);
					props.uploadUrl(url);
				}); // url to download the image will be stored to database
			},
		);
	};

	useEffect(() => {
		uploadHandler();
	}, [image]);

	return (
		<div className='container align-items-center justify-content-center bg-light'>
			<label htmlFor='imageUpload'>
				<img className={props.className} src={image ? newImage : avatar} />
			</label>
			<input
				type='file'
				onChange={changeHandler}
				id='imageUpload'
				style={{ opacity: 0, zIndex: -1 }}
			/>
			{err && <h6 style={{ color: 'red' }}>Error !!</h6>}
		</div>
	);
}

// set upload when user proceed with edit profilex
// for rounded 'rounded-circle w-75 mx-5 '
export default UploadImage;
