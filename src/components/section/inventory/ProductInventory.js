import React, { useState, useEffect } from 'react';
import Pagination from '../../controller/Pagination';
import AddProductModal from '../../controller/inventory/AddProductModal';
import SearchBar from '../../controller/SearchBar';
import ProductActionButton from '../../controller/inventory/ProductActionButton';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import QuantityEdit from '../../controller/inventory/QuantityEdit';
import '../../../style.css';

function ProductInventory() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);
	let [reload, setReload] = useState(false);
	let [response, setResponse] = useState();

	useEffect(async () => {
		let response = await axios.get(`${API_URL}/inventory/${page}/${limit}`);
		setResponse(response.data);
		setReload(false);
		return;
	}, [reload, page, limit]);

	if (response) {
		return (
			<div style={{ width: '95%', margin: 'auto' }}>
				<nav className='row'>
					<div className='col-3'>
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
					<div className='col-7'>
						<SearchBar
							url={API_URL + '/inventory/medicines'}
							onSearchResult={(value) => console.log(value)}
							onSearchClick={(value) => console.log(value)}
							//solve for extra feature later
						/>
					</div>
					<div className='col-2'>
						<AddProductModal />
					</div>
				</nav>
				<table className='table m-3'>
					<thead className='text-center table-dark'>
						<tr>
							<th scope='col'>id</th>
							<th scope='col'>image</th>
							<th scope='col'>name</th>
							<th scope='col'>description</th>
							<th scope='col'>price</th>
							<th scope='col'>quantity in stock</th>
							<th scope='col'>Action</th>
						</tr>
					</thead>
					<tbody>
						{response &&
							response.list.map((element) => {
								return (
									<tr scope={element.scope} className='w-100 h-25'>
										<td>{element.id}</td>
										<td style={{ width: '100px' }}>
											<img
												class='img-responsive img-thumbnail'
												src={element.image}
											/>
										</td>
										<td>{element.name}</td>
										<td>{element.description}</td>
										<td>{element.price}</td>
										<td style={{ width: '150px' }}>
											<QuantityEdit
												url={`${API_URL}/inventory/medicines/stock/${element.id}`}
												quantity={element.quantityInStock}
												field='quantityInStock'
												onChangeReload={() => setReload(true)}
											/>
										</td>
										<td>
											<ProductActionButton
												onChangeReload={() => setReload(true)}
												id={element.id}
												name={element.name}
												price={element.price}
												description={element.description}
												image={element.image}
											/>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
				<Pagination
					onLimitChange={(value) => setLimit(value)}
					onPageChange={(value) => setPage(value)}
					totalCount={response && response.pageLimit}
					siblingCount={2}
					currentPage={page}
					pageSize={limit}
				/>
			</div>
		);
	} else {
		return <h1>Loading ...</h1>;
	}
}

export default ProductInventory;
