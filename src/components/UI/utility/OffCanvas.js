import React from 'react';

function OffCanvas(props) {
	return (
		<div
			className={props.className}
			tabindex='-1'
			id={props.id}
			aria-labelledby={props.arialabelledby}
		>
			<div class='offcanvas-body '>
				<div className='row'>
					<div className='col-10'>
						<h4 className='text-justify'>{props.header}</h4>
					</div>
					<div className='col-1'>
						<button
							type='button'
							className='btn-close text-reset'
							data-bs-dismiss='offcanvas'
							aria-label='close'
						></button>
					</div>
				</div>
				{props.children}
			</div>
		</div>
	);
}

export default OffCanvas;
