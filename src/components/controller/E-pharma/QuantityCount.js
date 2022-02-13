import React, { useEffect, useState } from 'react';

function QuantityCount({
	quantity,
	onChange
}) {
	const [count, setCount] = useState(quantity);
	const onInputChange = (value) => {
		setCount(Number(value));
		onChange(Number(value));
	};

	useEffect(() => {
		if (quantity !== count) {
			setCount(quantity);
		}
	}, [count, quantity]);

	return (
		<div className='d-flex flex-row'>
			<div>
				<button
					className='btn me-3'
					onClick={() => onInputChange(quantity - 1)}
					disabled={quantity === 1}
					style={{ backgroundColor: 'var(--pink-color)', border: '1px solid var(--pink-color)', color: 'white' }}
				>
					-
				</button>
			</div>
			<div>
				<input
					className='form-control'
					type='number'
					value={count}
					onChange={(event) => onInputChange(event.target.value)}
					style={{ width: 150 }}
				/>
			</div>
			<div>
				<button 
					className='btn ms-3' 
					onClick={() => onInputChange(quantity + 1)}
					style={{ backgroundColor: 'var(--pink-color)', border: '1px solid var(--pink-color)', color: 'white' }}
				>
					+
				</button>
			</div>
		</div>
	);
}

export default QuantityCount;