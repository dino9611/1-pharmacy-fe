import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import AddProductModal from '../../controller/inventory/AddProductModal';
import SearchBar from '../../controller/SearchBar';
import ProductActionButton from '../../controller/inventory/ProductActionButton';
import CustomOrderAction from '../../controller/inventory/CustomOrderAction';

function CustomOrder() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);

	let data = useAxios({
		url: `http://localhost:2001/custom/${page}/${limit}`,
		method: 'get',
	});
	console.log(data.response);
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
						url='http://localhost:2001/inventory/medicines'
						onSearchResult={(value) => console.log(value)}
						onSearchClick={(value) => console.log(value)}
						//solve for extra feature later
					/>
				</div>
			</nav>
			<table className='table'>
				<thead className='text-center'>
					<tr>
						<th scope='col'>id</th>
						<th scope='col'>image</th>
						<th scope='col'>user id</th>
						<th scope='col'>actions</th>
					</tr>
				</thead>
				<tbody>
					{data.response &&
						data.response.prescriptionList.map((element) => {
							return (
								<tr scope={element.scope} className='w-100 h-25'>
									<td>{element.id}</td>
									<td className=''>
										<img
											class='img-responsive img-thumbnail'
											src={element.image}
										/>
									</td>
									<td>{element.UserId}</td>
									<td>
										<CustomOrderAction
											userId={element.UserId}
											prescriptionId={element.id}
											onChangeReload={() => console.log('reload')}
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

export default CustomOrder;
