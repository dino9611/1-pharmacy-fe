import React, { useEffect, useState } from 'react';

function SortPrice(props) {
	const [price, setPrice] = useState(100);

	const onChangeHandler = (event) => {
		setPrice(+event.target.value);
		props.sortPriceChange(price);
	};
	return (
		<div>
			<input type='range' list='tickmarks' onChange={onChangeHandler} />
			<datalist id='tickmarks'>
				<option value='0' label='0%'>
					0
				</option>
				<option value='10' label='10.000'>
					10.000
				</option>
				<option value='20'>20.000</option>
				<option value='30'>30.000</option>
				<option value='40'>40.000</option>
				<option value='50' label='50%'>
					50.000
				</option>
				<option value='60'>60.000</option>
				<option value='70'>70.000</option>
				<option value='80'>80.000</option>
				<option value='90'>90.000</option>
				<option value='100' label='100%'>
					100.0000
				</option>
			</datalist>
		</div>
	);
}

export default SortPrice;
