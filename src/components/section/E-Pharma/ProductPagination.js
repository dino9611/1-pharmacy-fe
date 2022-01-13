import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import ProductListWrapper from '../../UI/E-Pharma/ProductListWrapper';

function ProductPagination() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);

	let { response, error, loading } = useAxios({
		url: `http://localhost:2001/inventory/store/${page}/${limit}/items?name=DESC&min=1000&max=100000`,
		method: 'get',
	});

	console.log(response);
	const changePageHandler = (value) => {
		setPage(value);
	}; // needed for Pagination component props passing and setpage

	const changeLimitHandler = (value) => {
		setLimit(value);
	}; // needed for Pagination component props passing and setlimit

	return (
		<div>
			<Pagination
				onLimitChange={changeLimitHandler}
				onPageChange={changePageHandler}
				totalCount={response && response.pageLimit}
				siblingCount={2}
				currentPage={page}
				pageSize={limit}
			>
				<ProductListWrapper
					data={response && response.list}
					isError={error}
					isLoading={loading}
				/>
			</Pagination>
		</div>
	);
}

export default ProductPagination;
