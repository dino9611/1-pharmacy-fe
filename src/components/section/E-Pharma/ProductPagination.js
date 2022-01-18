import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import ProductListWrapper from '../../UI/E-Pharma/ProductListWrapper';
import Category from './Category';

function ProductPagination() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);
	let [filteredData, setFilteredData] = useState()

	let { response, error, loading } = useAxios({
		url: `http://localhost:2001/inventory/${page}/${limit}`,
		method: 'get',
	});

	const changePageHandler = (value) => {
		setPage(value);
	}; // needed for Pagination component props passing and setpage

	const changeLimitHandler = (value) => {
		setLimit(value);
	}; // needed for Pagination component props passing and setlimit

	return (
		<div>
			<Category setFilteredData={setFilteredData} />
			<Pagination
				onLimitChange={changeLimitHandler}
				onPageChange={changePageHandler}
				totalCount={response && response.pageLimit}
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
}

export default ProductPagination;
