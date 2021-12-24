import React, { useRef } from 'react';

function ActionButton() {
	const modalRef = useRef();

	const showModal = () => {
		const modalEle = modalRef.current;
		const bsModal = new Modal(modalEle, {
			backdrop: 'static',
			keyboard: false,
		});
		bsModal.show();
	};

	const hideModal = () => {
		const modalEle = modalRef.current;
		const bsModal = bootstrap.Modal.getInstance(modalEle);
		bsModal.hide();
	};
	return (
		<div className='btn-group'>
			<button
				type='button'
				className='btn btn-outline-primary'
				onClick={showModal}
			>
				edit
			</button>
			<button className='btn btn-outline-danger'>delete</button>
		</div>
	);
}

export default ActionButton;
