import React, { useState, useEffect } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import AddProductModal from '../../controller/inventory/AddProductModal';
import SearchBar from '../../controller/SearchBar';
import ProductActionButton from '../../controller/inventory/ProductActionButton';
import { useHistory } from 'react-router';
import { API_URL } from '../../../constants/api';

function ProductInventory() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);
	let [reload, setReload] = useState(false);
	const history = useHistory();

	let data = useAxios({
		url: `${API_URL}/inventory/${page}/${limit}`,
		method: 'get',
	});

	useEffect(async () => {
		return () => {
			history.push(`/admin/inventory/product`);
			setReload(false);
		};
	}, [reload]);

	return (
		<div>
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
						url={`${API_URL}/inventory/medicines`}
						onSearchResult={(value) => console.log(value)}
						onSearchClick={(value) => console.log(value)}
						//solve for extra feature later
					/>
				</div>
				<div className='col-2'>
					<AddProductModal />
				</div>
			</nav>
			<table className='table'>
				<thead className='text-center'>
					<tr>
						<th scope='col'>id</th>
						<th scope='col'>image</th>
						<th scope='col'>name</th>
						<th scope='col'>price</th>
						<th scope='col'>quantity in stock</th>
						<th scope='col'>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.response &&
						data.response.list.map((element) => {
							return (
								<tr scope={element.scope} className='w-100 h-25'>
									<td>{element.id}</td>
									<td className=''>
										<img
											class='img-responsive img-thumbnail'
											src={element.image}
										/>
									</td>
									<td>{element.name}</td>
									<td>{element.price}</td>
									<td>{element.quantityInStock}</td>
									<td>
										<ProductActionButton
											onChangeReload={() => setReload(true)}
											id={element.id}
											name={element.name}
											price={element.price}
											bottle_quantity={element.bottle_quantity}
											quantity_per_bottle={element.quantity_per_bottle}
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
				totalCount={data.response && data.response.pageLimit}
				siblingCount={2}
				currentPage={page}
				pageSize={limit}
			/>
		</div>
	);
}

export default ProductInventory;
