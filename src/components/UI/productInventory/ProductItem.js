import React from 'react';

function ProductItem(props) {
	return (
		<div>
			<h3>{props.id}</h3>
			<img src={props.image} />
			<li>{props.name}</li>
			<li>{props.price}</li>
		</div>
	);
}

export default ProductItem;
