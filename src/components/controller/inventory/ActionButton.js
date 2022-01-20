import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import EditMaterial from '../../section/inventory/EditMaterial';
import axios from 'axios';
import { API_URL } from '../../../constants/api';

function ActionButton(props) {
	const [deleteItem, setDeleteItem] = useState(false);
	const [close, setClose] = useState(true);
	const modalRef = useRef();

	useEffect(() => {
		if (deleteItem) {
			axios.delete(`${API_URL}/material/${props.id}`);
			props.onChangeReload();
		}
		return setDeleteItem(false);
	}, [deleteItem]);

	const showModal = () => {
		const modalElement = modalRef.current;
		const bsModal = new Modal(modalElement, {
			backdrop: 'static',
			keyboard: false,
		});
		bsModal.show();
	};

	const closeModal = () => {
		setClose(false);
		const modalElement = modalRef.current;
		const bsModal = Modal.getInstance(modalElement);
		if (close) {
			bsModal.hide();
			setClose(true);
			props.onChangeReload();
		}
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
			<div className='modal fade' ref={modalRef} tabIndex='-1'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='staticBackdropLabel'>
								Modal title
							</h5>
							<button
								type='button'
								className='btn-close'
								onClick={closeModal}
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<EditMaterial
								id={props.id}
								name={props.name}
								price={props.price}
								bottle_quantity={props.bottle_quantity}
								quantity_per_bottle={props.quantity_per_bottle}
								onEditHandler={closeModal}
							/>
						</div>
					</div>
				</div>
			</div>
			<button
				className='btn btn-outline-danger'
				onClick={() => setDeleteItem(true)}
			>
				delete
			</button>
		</div>
	);
}

export default ActionButton;
