import React, { useState } from 'react';
import SortName from '../../controller/E-pharma/SortName';
import SortPrice from '../../controller/E-pharma/SortPrice';

function SortSideBar(props) {
	const [sort, setSort] = useState({
		price: 100,
		name: 'ASC',
	});

	return (
		<div>
			<SortName sortNameChange={(value) => console.log(value)} />
			<SortPrice sortPriceChange={(value) => console.log(value)} />
		</div>
	);
}

export default SortSideBar;
