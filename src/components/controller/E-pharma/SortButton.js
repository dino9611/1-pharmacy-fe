import React, { useEffect, useState } from 'react';

function SortButton(props) {
	const [asc, setAsc] = useState(true);

	useEffect(() => {
		props.sortButtonChange(asc); // will change when triggered
		return;
	}, [asc]);

	return (
		<div className='btn-group ms-2'>
			<h6 className='m-2 pt-1'>{props.label}</h6>
			<button
				className={`m-2 btn ${asc ? 'btn-primary' : 'btn-danger'}`}
				onClick={() => setAsc(!asc)}
			>
				{asc ? 'ASC' : 'DESC'}
			</button>
		</div>
	);
}

export default SortButton;
