import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import RecordActionButton from '../../controller/inventory/RecordActionButton';

function MaterialUssageRecord() {
	const [custom, setCustom] = useState(false);

	const { response } = useAxios({
		method: 'get',
		url: `http://localhost:2001/material/${
			custom ? 'prescription' : 'stock'
		}/list`,
	});

	console.log(response);
	console.log(
		`http://localhost:2001/material/${custom ? 'prescription' : 'stock'}/list`,
	);

	return (
		<div>
			<div className='btn-group'>
				<button onClick={() => setCustom(false)}>Pharma Stock</button>
				<button onClick={() => setCustom(true)}>Custom Order</button>
			</div>
			<table>
				<thead>
					<tr>
						<td>id</td>
						<td>material name</td>
						<td>detail</td>
					</tr>
				</thead>
				<tbody>
					{response &&
						response.map((element) => {
							return (
								<tr>
									<td>{element.id}</td>
									<td>{element.name}</td>
									<td>
										<RecordActionButton data={element.Medicines} />
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

export default MaterialUssageRecord;
