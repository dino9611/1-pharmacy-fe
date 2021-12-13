import React from 'react';

function Modal(props) {
	return (
		<div className='modal'>
			{props.title}
			{props.children}
			<button>closed</button>
		</div>
	);
}

export default Modal;
