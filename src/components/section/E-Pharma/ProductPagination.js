import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import ProductListWrapper from '../../UI/E-Pharma/ProductListWrapper';
import SortButton from '../../controller/E-pharma/SortButton';
import Category from './Category';
import { API_URL } from '../../../constants/api';

function ProductPagination() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);
	let [name, setName] = useState(true);
	let [price, setPrice] = useState(true);
	let [filteredData, setFilteredData] = useState()


	let { response, error, loading } = useAxios({
		url: `${API_URL}/inventory/store/${page}/${limit}/items?name=${name ? 'ASC' : 'DESC'
			}&price=${price ? 'ASC' : 'DESC'}&min=1000&max=10000000`,
		method: 'get',
	});

	console.log(response);

	if (response) {
		if (response.itemCount > 10) {
			return (
				<div>
					<Category setFilteredData={setFilteredData} />
					<div className='btn-group'>
						<SortButton
							sortButtonChange={(value) => setName(value)}
							label='name'
						/>
						<SortButton
							sortButtonChange={(value) => setPrice(value)}
							label='price'
						/>
					</div>
					<Pagination
						onLimitChange={(value) => setLimit(value)}
						onPageChange={(value) => setPage(value)}
						totalCount={response && response.itemCount}
						siblingCount={2}
						currentPage={page}
						pageSize={limit}
					>
						<ProductListWrapper
							data={filteredData ? filteredData : response && response.list}
							isError={error}
							isLoading={loading}
						/>
					</Pagination>
				</div>
			);
		} else {
			return (
				<ProductListWrapper
					data={response && response.list}
					isError={error}
					isLoading={loading}
				/>
			);
		}
	} else {
		return <h1>Loading ...</h1>;
	}
}

export default ProductPagination;
