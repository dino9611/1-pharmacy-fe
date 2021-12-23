import React from 'react';
import TableActions from '../../controller/TableActions';

function MaterialTableItem(props) {
	const unitConversion = ['gr', 'ml', 'KG', 'L'];

	return (
		<tr scope={props.scope}>
			<td>{props.id}</td>
			<td>{props.name}</td>
			<td>{props.price}</td>
			<td className='text-center'>{props.bottle_quantity}</td>
			<td className='text-center'>{props.quantity_per_bottle}</td>
			<td className='text-center'>{props.stock_quantity}</td>
			<td className='text-center'>{unitConversion[props.UnitId - 1]}</td>
			<td>
				<TableActions />
			</td>
		</tr>
	);
}

export default MaterialTableItem;
