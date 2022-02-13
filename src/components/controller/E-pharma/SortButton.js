import React, { useEffect, useState } from 'react';

function SortButton(props) {
	const [asc, setAsc] = useState(true);

	useEffect(() => {
		props.sortButtonChange(asc); // will change when triggered
		return;
	}, [asc]);

	return (
		<div className='d-flex flex-row ps-3' style={{ backgroundColor: 'mistyrose', width: 'fit-content', borderRadius: 5 }}>
			<p style={{ transform: 'translateY(8px)', fontSize: 18, fontWeight: 500 }}>{props.label}:</p>
			<button
				className={`btn ms-3 ${asc ? 'btn-primary' : 'btn-danger'}`}
				onClick={() => setAsc(!asc)}
				style={{
					color: 'white',
					backgroundColor: 'var(--pink-color)',
					border: '1px solid var(--red-color)',
				}}
			>
				{asc ? 'Highest to Lowest' : 'Lowest to Highest'}
			</button>
		</div>
	);
}

export default SortButton;
