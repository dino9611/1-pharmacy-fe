import React, { useState, useEffect } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import SearchBar from '../../controller/SearchBar';
import AddMaterialModal from '../../controller/inventory/AddMaterialModal';
import ActionButton from '../../controller/inventory/ActionButton';
import axios from 'axios';

function MaterialInventory() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);
	let [reload, setReload] = useState(false);
	let [data, setData] = useState(null);
	const unitConversion = ['gr', 'ml', 'kg', 'L'];

	// let { response, error, loading } = useAxios({
	// 	url: `http://localhost:2001/material/getList/${page}/${limit}`,
	// 	method: 'get',
	// });

	useEffect(async () => {
		let response = await axios.get(
			`http://localhost:2001/material/getList/${page}/${limit}`,
		);
		setData(response.data);
		return () => {
			setReload(false);
		};
	}, [reload, data]); // still not functioning

	const changePageHandler = (value) => {
		setPage(value);
	}; // needed for Pagination component props passing and setpage

	const changeLimitHandler = (event) => {
		setLimit(+event.target.value);
	}; // needed for Pagination component props passing and setlimit
	return (
		<div>
			<div className='row'>
				<div className='col-3'>
					<label className='px-2' htmlFor='limit'>
						Item Limit
					</label>
					<select
						className='btn btn-secondary dropdown-toggle'
						name='limit'
						id='item-limit'
						onChange={changeLimitHandler}
					>
						<option value='9'>9</option>
						<option value='12'>12</option>
					</select>
				</div>
				<div className='col-7'>
					<SearchBar
						url='http://localhost:2001/inventory/materials'
						onSearchResult={(value) => console.log(value)}
						onSearchClick={(value) => console.log(value)}
						//solve for extra feature later
					/>
				</div>
				<div className='col-2'>
					<AddMaterialModal onChangeReload={() => setReload(true)} />
				</div>
			</div>
			<Pagination
				onPageChange={changePageHandler}
				totalCount={data && data.pageLimit}
				siblingCount={2}
				currentPage={page}
				pageSize={limit}
			>
				{/* <MaterialTable data={data && data.list} loading={loading} /> */}
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
						{data &&
							data.list.map((element) => {
								return (
									<tr
										scope={element.scope}
										className='w-100 h-25'
										key={element.id}
									>
										<td>{element.id}</td>
										<td>{element.name}</td>
										<td>{element.price}</td>
										<td className='text-center'>{element.bottle_quantity}</td>
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
}

export default MaterialInventory;
