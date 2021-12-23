import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import ProductListWrapper from '../../UI/productInventory/ProductListWrapper';
import ProductTable from '../../UI/productInventory/ProductTable';
import OffCanvas from '../../UI/utility/OffCanvas';

function ProductInventory() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);

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
			<Pagination
				onLimitChange={changeLimitHandler}
				onPageChange={changePageHandler}
				totalCount={response && response.pageLimit}
				siblingCount={2}
				currentPage={page}
				pageSize={limit}
			>
				<ProductTable
					data={response && response.list}
					isError={error}
					isLoading={loading}
				/>
				{/* <ProductListWrapper
					data={response && response.list}
					isError={error}
					isLoading={loading}
				/> */}
			</Pagination>
			<OffCanvas />
		</div>
	);
}

export default ProductInventory;
