import React from 'react';
import { useState } from 'react/cjs/react.development';

function QuantityCount(props) {
	const [count, setCount] = useState(1);

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
			<div className='col'>
				<input
					className='form-control'
					type='number'
					value={count}
					onFocus={() => setCount('')}
					onChange={(event) => setCount(+event.target.value)}
					onBlur={(event) => console.log(+event.target.value)}
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
