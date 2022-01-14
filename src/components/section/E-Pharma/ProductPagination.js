import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import ProductListWrapper from '../../UI/E-Pharma/ProductListWrapper';

function ProductPagination(props) {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);

	let { response, error, loading } = useAxios({
		url: `http://localhost:2001/inventory/store/${page}/${limit}/items?name=${
			props.sortName ? 'ASC' : 'DESC'
		}&price=${props.sortPrice ? 'ASC' : 'DESC'}&min=${props.min || '0'}&max=${
			props.max || '100000000'
		}`,
		method: 'get',
	});

	console.log(response);
	console.log(
		`http://localhost:2001/inventory/store/${page}/${limit}/items?name=${
			props.sortName ? 'ASC' : 'DESC'
		}&price=${props.sortPrice ? 'ASC' : 'DESC'}&min=${props.min || '0'}&max=${
			props.max || '100000000'
		}`,
	);

	return (
		<div>
			<Pagination
				onLimitChange={(value) => setLimit(value)}
				onPageChange={(value) => setPage(value)}
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
