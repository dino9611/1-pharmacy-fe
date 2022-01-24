import React, { useState, useEffect, useDebugValue } from 'react';
import Pagination from '../../controller/Pagination';
import SearchBar from '../../controller/SearchBar';
import AddMaterialModal from '../../controller/inventory/AddMaterialModal';
import ActionButton from '../../controller/inventory/ActionButton';
import QuantityEdit from '../../controller/inventory/QuantityEdit';
import { API_URL } from '../../../constants/api';
import axios from 'axios';

function MaterialInventory() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);
	let [reload, setReload] = useState(false);
	let [response, setResponse] = useState();
	const unitConversion = ['gr', 'ml', 'kg', 'L'];

	useEffect(async () => {
		let response = await axios.get(
			`${API_URL}/material/getList/${page}/${limit}`,
		);
		setResponse(response.data);
		setReload(false);
		return () => {
			console.log('reload');
		};
	}, [reload, page, limit]); // still not functioning

	if (response) {
		return (
			<div>
				<div className='row'>
					<div className='col-2'>
						<label className='px-2' htmlFor='limit'>
							Item Limit
						</label>
						<select
							className='btn btn-secondary dropdown-toggle'
							name='limit'
							id='item-limit'
							onChange={(event) => setLimit(+event.target.value)}
						>
							<option value='9'>9</option>
							<option value='12'>12</option>
						</select>
					</div>
					{/* <div className='col-7'>
						<SearchBar
							url={API_URL + '/inventory/materials'}
							onSearchResult={(value) => console.log(value)}
							onSearchClick={(value) => console.log(value)}
							//solve for extra feature later
						/>
					</div> */}
					<div className='col-2'>
						<AddMaterialModal onChangeReload={() => setReload(true)} />
					</div>
				</div>
				<Pagination
					onPageChange={(value) => setPage(value)}
					totalCount={response && response.pageLimit}
					siblingCount={2}
					currentPage={page}
					pageSize={limit}
				>
					<table className='table mt-3'>
						<thead className='text-center table-dark'>
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
							{response &&
								response.list.map((element) => {
									return (
										<tr
											scope={element.scope}
											className='w-100 h-25'
											key={element.id}
										>
											<td>{element.id}</td>
											<td>{element.name}</td>
											<td>{element.price}</td>
											<td className='text-center'>
												<QuantityEdit
													url={`${API_URL}/material/stock/${element.id}`}
													quantity={element.bottle_quantity}
													field='bottle_quantity'
													onChangeReload={() => setReload(true)}
												/>
											</td>
											<td className='text-center'>
												{element.quantity_per_bottle}
											</td>
											<td className='text-center'>{element.stock_quantity}</td>
											<td className='text-center'>
												{unitConversion[element.UnitId - 1]}
											</td>
											<td>
												<ActionButton
													id={element.id}
													name={element.name}
													price={element.price}
													bottle_quantity={element.bottle_quantity}
													quantity_per_bottle={element.quantity_per_bottle}
													stock_quantity={element.stock_quantity}
													onChangeReload={() => setReload(true)}
												/>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</Pagination>
			</div>
		);
	} else {
		return <h1>loading...</h1>;
	}
}

export default MaterialInventory;
