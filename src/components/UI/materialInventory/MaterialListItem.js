import React from 'react';

function MaterialListItem(props) {
	return (
		<div>
			<h3>{props.id}</h3>
			<h2>{props.name}</h2>
			<li>{props.bottle_quantity}</li>
			<li>{props.quantity_per_bottle}</li>
			<li>{props.stock_quantity}</li>
			<li>{props.price}</li>
			<li>{props.UnitId}</li>
		</div>
	);
}

export default MaterialListItem;
