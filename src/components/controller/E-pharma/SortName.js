import React, { useEffect, useState } from 'react';

function SortName(props) {
	const [asc, setAsc] = useState(true);

	useEffect(() => {
		props.sortNameChange(asc); // will change when triggered
		return;
	}, [asc]);

	return (
		<div>
			<button onClick={() => setAsc(true)}>ASC</button>
			<button onClick={() => setAsc(false)}>DSC</button>
		</div>
	);
}

export default SortName;
