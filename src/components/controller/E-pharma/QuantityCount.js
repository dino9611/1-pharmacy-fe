import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';

function QuantityCount(props) {
	const [count, setCount] = useState(1);

	useEffect(() => {
		props.onChange(count);
	}, [count]);

	return (
		<div className='row'>
			<div className='col'>
				<button
					className='btn btn-secondary'
					onClick={() => setCount(count - 1)}
					disabled={count === 1 ? true : false}
				>
					-
				</button>
			</div>
			<div className='col-5'>
				<input
					className='form-control'
					type='number'
					value={props.quantity}
					onChange={(event) => setCount(+event.target.value)}
				/>
			</div>
			<div className='col'>
				<button className='btn btn-primary' onClick={() => setCount(count + 1)}>
					+
				</button>
			</div>
		</div>
	);
}

export default QuantityCount;
