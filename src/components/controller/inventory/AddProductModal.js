import React, { useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import AddInventory from '../../section/inventory/AddInventory';

function AddProductModal(props) {
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
			<button className='btn btn-primary' onClick={showModal}>
				Add
			</button>
			<div className='modal fade' ref={modalRef} tabIndex='-1'>
				<div className={`modal-dialog ${props.size}`}>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='staticBackdropLabel'>
								Add Inventory
							</h5>
							<button
								type='button'
								className='btn-close'
								onClick={closeModal}
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<AddInventory onAddProduct={() => closeModal()} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddProductModal;
