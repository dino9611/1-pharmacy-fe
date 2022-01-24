import React, { useRef, useState } from 'react';
import { Modal } from 'bootstrap';

function CustomModal(props) {
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
	};

	return (
		<div>
			{props.button && (
				<div className='btn btn-primary' onClick={showModal}>
					{props.button}
				</div>
			)}
			{props.nav && <div onClick={showModal}>CUSTOM ORDER</div>}
			<div className='modal fade' ref={modalRef} tabIndex='-1'>
				<div className={`modal-dialog ${props.size}`}>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='staticBackdropLabel'>
								{props.title}
							</h5>
							<button
								type='button'
								className='btn-close'
								onClick={closeModal}
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>{props.children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CustomModal;
