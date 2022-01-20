import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import CustomOrderAction from '../../controller/inventory/CustomOrderAction';
import { API_URL } from '../../../constants/api';

function CustomOrder() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);

	let data = useAxios({
		url: `${API_URL}/custom/${page}/${limit}`,
		method: 'get',
	});

	console.log(data.response)
	return (
		<div>
			<nav className='row mt-3'>
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
			</nav>

			
			<table className='table align-middle mt-3'>
				<thead className='text-center'>
					<tr className='table-primary'>
						<th scope='col'>Id</th>
						<th scope='col'>Image</th>
						<th scope='col'>User Id</th>
						<th scope='col'>Actions</th>
					</tr>
				</thead>
				<tbody className='table table-hover'>
					{data.response &&
						data.response.prescriptionList.map((element) => {
							return (
								<tr className='w-100 h-25 text-center '>
									<td>{element.id}</td>
									<td className=''>
										<img
											alt=""
											class='img-responsive img-thumbnail'
											src={element.image}
										/>
									</td>
									<td>{element.UserId}</td>
									<td>
										<CustomOrderAction
											userId={element.UserId}
											prescriptionId={element.id}
											image={element.image}
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
