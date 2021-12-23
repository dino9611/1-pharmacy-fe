import React from 'react';
import ActionButtonEdit from '../../controller/ActionButton';
import EditMaterial from '../../section/inventory/EditMaterial';

function MaterialTable(props) {
	const unitConversion = ['gr', 'ml', 'kg', 'L'];
	return (
		<div>
			<table className='table'>
				<thead className='text-center'>
					<tr>
						<th scope='col'>id</th>
						<th scope='col'>name</th>
						<th scope='col'>price</th>
						<th scope='col'>bottle quantity</th>
						<th scope='col'>quantity per bottle</th>
						<th scope='col'>quantity in stock</th>
						<th scope='col'>Unit</th>
						<th scope='col'>Action</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map((element) => {
						return (
							<tr scope={element.scope} className='w-100 h-25' key={element.id}>
								<td>{element.id}</td>
								<td>{element.name}</td>
								<td>{element.price}</td>
								<td className='text-center'>{element.bottle_quantity}</td>
								<td className='text-center'>{element.quantity_per_bottle}</td>
								<td className='text-center'>{element.stock_quantity}</td>
								<td className='text-center'>
									{unitConversion[element.UnitId - 1]}
								</td>
								<td>
									<ActionButtonEdit
										id={element.id}
										title={`Edit ${element.name}`}
										deleteUrl='http://localhost:2001/material'
									>
										<EditMaterial
											id={element.id}
											name={element.name}
											price={element.price}
											bottle_quantity={element.bottle_quantity}
											quantity_per_bottle={element.quantity_per_bottle}
											stock_quantity={element.stock_quantity}
											UnitId={element.UnitId}
										></EditMaterial>
									</ActionButtonEdit>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default MaterialTable;
