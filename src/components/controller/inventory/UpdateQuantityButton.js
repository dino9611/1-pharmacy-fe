import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UpdateQuantityButton(props) {
	const [quantity, setQuantity] = useState(props.quantity);
	const [update, setUpdate] = useState(false);
	const [error, setError] = useState(false);

	useEffect(async () => {
		if (quantity > 100) {
			setError(true);
		} else {
			let data = await axios.put(
				`http://localhost:2001/inventory/${props.id}`,
				{
					quantityInStock: quantity,
				},
			);
			setError(false);
		}
		return () => {
			// console.log(data);
			setUpdate(false);
		};
	}, [update, quantity]);

	return (
		<div>
			<button
				onClick={() => setQuantity(quantity - 1)}
				disabled={quantity === 0 ? true : false}
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
			/>
			{error && <span>too many</span>}
			<button onClick={() => setQuantity(quantity + 1)}>+</button>
		</div>
	);
}

export default UpdateQuantityButton;
