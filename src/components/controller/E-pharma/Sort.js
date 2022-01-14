import React, { useEffect, useState } from 'react';

function SortName(props) {
	const [asc, setAsc] = useState(true);

	useEffect(() => {
		props.sortChange(asc); // will change when triggered
		return;
	}, [asc]);

	return (
		<div>
			<label className=''>{props.label}</label>
			<button onClick={() => setAsc(!asc)}>{asc ? 'Up' : 'down'}</button>
		</div>
	);
}

export default SortName;
