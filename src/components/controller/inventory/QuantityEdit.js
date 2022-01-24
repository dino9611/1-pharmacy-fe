import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useDidUpdate from '../../../hooks/useDidUpdate';

function QuantityEdit(props) {
	const [quantity, setQuantity] = useState(props.quantity);
	const [input, setInput] = useState(props.quantity);
	const updateQuantity = async () => {
		let data = await axios.put(props.url, { [props.field]: quantity });
		setInput(quantity);
		props.onChangeReload();
	};
	console.log(props);
	useDidUpdate(updateQuantity, quantity);

	return (
		<div className='btn-group'>
			<button
				className='btn btn-secondary'
				onClick={() => {
					setQuantity(quantity - 1);
				}}
				disabled={quantity === 0 ? true : false}
			>
				-
			</button>
			<input
				className='form-control'
				value={input}
				onChange={(event) => setInput(+event.target.value)}
				onBlur={() => setQuantity(input)}
			/>
			<button
				className='btn btn-primary'
				onClick={() => setQuantity(quantity + 1)}
			>
				+
			</button>
		</div>
	);
}

export default QuantityEdit;
