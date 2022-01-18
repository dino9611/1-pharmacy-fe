import React, { useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import CustomOrder from '../../section/inventory/CreateCustomOrder';
import axios from 'axios';
import { API_URL } from '../../../constants/api';

function CustomOrderAction(props) {
	const [materials, setMaterials] = useState([]);
	const [serving, setServing] = useState(0);
	const [reject, setReject] = useState(false);
	const [close, setClose] = useState(true);
	const modalRef = useRef();

	const onConfirmMaterial = () => {
		const body = {
			PrescriptionId: props.prescriptionId,
			serving,
			image: props.image,
			materials,
		};
		setServing(0);
		axios.post(API_URL + '/custom/create/order', body);
		setClose(false);
		const modalElement = modalRef.current;
		const bsModal = Modal.getInstance(modalElement);
		if (close) {
			bsModal.hide();
			setClose(true);
			props.onChangeReload();
		}
	};

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
			<div className='modal fade ' ref={modalRef} tabIndex='-1'>
				<div className='modal-dialog modal-xl'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h3 className='modal-title ' id='staticBackdropLabel'>
								Order {props.prescriptionId}
								{props.userId}
							</h3>
							<button
								type='button'
								className='btn-close'
								onClick={closeModal}
								aria-label='Close'
							></button>
						</div>
						<div className='row'>
							<div className='modal-body d-flex flex-row'>
								<div className='col'>
									<img alt="" src={props.image} />
								</div>
								<div className='col ms-4'>
									<CustomOrder
										onAddMaterial={(value) =>
											setMaterials([...materials, value])
										}
										material={materials}
									/>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='modal-footer d-flex justify-content-start ps-4'>
								<div className='row'>
									<input
										type='number'
										placeholder='serving'
										onChange={(event) => setServing(event.target.value)}
									/>
								</div>
								<div className='row'>
									<div className='col'>
										<button
											className='btn btn-primary'
											onClick={onConfirmMaterial}
											disabled={serving === 0 ? true : false}
										>
											confirm
										</button>
										<button
											className='btn btn-secondary'
											onClick={closeModal}
											aria-label='Close'
										>
											cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button
				className='btn btn-outline-danger'
				onClick={() => setReject(true)}
			>
				Reject
			</button>
		</div>
	);
}

export default CustomOrderAction;
