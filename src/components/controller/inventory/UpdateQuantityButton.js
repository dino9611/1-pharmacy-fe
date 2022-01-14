import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UpdateQuantityButton(props) {
	const [quantity, setQuantity] = useState(props.quantity);
	const [update, setUpdate] = useState(false);
	const [error, setError] = useState(false);

	useEffect(async () => {
		if (quantity > props.limit) {
			setError(true);
		} else {
			let data = await axios.put(`${props.url}${props.id}`, {
				quantityInStock: quantity,
			});
			setError(false);
		}
		return () => {
			// console.log(data);
			setUpdate(false);
		};
	}, [update, quantity]);

	return (
		<div className='d-flex text-align-center'>
			<div className='btn-group'>
				<button
					onClick={() => setQuantity(quantity - 1)}
					disabled={quantity === 0 ? true : false}
					className='btn btn-secondary'
				>
					-
				</button>
				<input
					type='number'
					min={0}
					max={1000}
					onChange={(event) => setQuantity(+event.target.value)}
					onBlur={() => setUpdate(true)}
					value={quantity}
					className='form-control'
				/>

				<button
					onClick={() => setQuantity(quantity + 1)}
					className='btn btn-primary'
				>
					+
				</button>
			</div>
			{error && <span className='row'>too many</span>}
		</div>
	);
}

export default UpdateQuantityButton;
