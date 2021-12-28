import React, { useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import AddMaterial from '../section/inventory/AddMaterial';
import UserProfileForm from '../section/UserProfile/UserProfileForm';

function EditProfileModal(props) {
	const modalRef = useRef();

	const showModal = () => {
		const modalElement = modalRef.current;
		const bsModal = new Modal(modalElement, {
			backdrop: 'static',
			keyboard: false,
		});
		bsModal.show();
	};

	const closeModal = () => {
		const modalElement = modalRef.current;
		const bsModal = Modal.getInstance(modalElement);
		bsModal.hide();
		props.onSubmitReload();
	};

	return (
		<div>
			<button className='btn btn-primary' onClick={showModal}>
				Edit Profile
			</button>
			<div className='modal fade' ref={modalRef} tabIndex='-1'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='staticBackdropLabel'>
								Edit profile
							</h5>
							<button
								type='button'
								className='btn-close'
								onClick={closeModal}
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<UserProfileForm
								id={props.id}
								firstName={props.firstName}
								lastName={props.lastName}
								gender={props.gender}
								birthdate={props.birthdate}
								address={props.address}
								username={props.username}
								email={props.email}
								avatar={props.avatar}
								onEditSubmitHandler={closeModal}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditProfileModal;
