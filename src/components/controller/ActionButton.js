import axios from 'axios';
import React, { useRef } from 'react';

function ActionButtonEdit(props) {
	const deleteHandler = () => {
		axios
			.delete(`${props.deleteUrl}/${props.id}`)
			.then(() => console.log('deleted'))
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='btn-group'>
			<button
				type='button'
				className='btn btn-outline-primary'
				data-bs-toggle='modal'
				data-bs-target={`#editMaterial${props.id}`}
			>
				edit
			</button>
			<button className='btn btn-outline-danger' onClick={deleteHandler}>
				delete
			</button>
			<div
				className='modal fade'
				id={`editMaterial${props.id}`}
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='staticBackdropLabel'>
								{props.title}
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
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

export default ActionButtonEdit;
