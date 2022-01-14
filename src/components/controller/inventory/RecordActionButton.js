import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import EditMaterial from '../../section/inventory/EditMaterial';
import axios from 'axios';

function RecordActionButton(props) {
	const [close, setClose] = useState(true);
	const conversion = ['mg', 'gr', 'ml', 'L'];
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
		setClose(false);
		const modalElement = modalRef.current;
		const bsModal = Modal.getInstance(modalElement);
		if (close) {
			bsModal.hide();
			setClose(true);
		}
	};
	console.log(props.data);
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
				<div className='modal-dialog modal-xl'>
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
							<table>
								<thead>
									<tr>
										<td>id</td>
										<td>image</td>
										<td>name</td>
										<td>dosage</td>
									</tr>
								</thead>
								<tbody>
									{props.data &&
										props.data.map((element) => {
											return (
												<tr>
													<td>{element.id}</td>
													<td>
														<img
															className='img-thumbnail'
															src={element.image}
														/>
													</td>
													<td>
														{element.name
															? `${element.name}`
															: `${element.id}${element.PrescriptionId}`}
													</td>
													<td>
														{element.Medicine_ingredients.quantity}{' '}
														{conversion[element.Medicine_ingredients.UnitId]}
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RecordActionButton;
