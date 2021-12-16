import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import MaterialListWrapper from '../../UI/materialInventory/MaterialListWrapper';

function MaterialInventory() {
	let [limit, setLimit] = useState(10);
	let [offset, setOffset] = useState(0);
	let [page, setPage] = useState(1);

	let { response, error, loading } = useAxios({
		url: `http://localhost:2001/material/getList/${limit}/${offset}`,
		method: 'get',
	});

	const onLimitChangeHandler = (value) => {
		setLimit(value);
	};

	const onPageChangeHandler = (value) => {
		if (value === 'next') {
			setPage(page + 1);
			setOffset(offset + limit);
		}
		if (value === 'prev') {
			setPage(page - 1);
			setOffset(offset - limit);
		}
	};

	const onDirectPageChangeHandler = (value) => {
		let changePage = +value;
		setOffset(limit * changePage - limit);
		setPage(changePage);
	};

	return (
		<div>
			<Pagination
				limitChangeHandler={onLimitChangeHandler}
				pageChangeHandler={onPageChangeHandler}
				directPageChangeHandler={onDirectPageChangeHandler}
				itemCount={response && response.pageLimit}
				page={page}
				limit={limit}
			>
				<MaterialListWrapper
					data={response && response.list}
					isError={error}
					isLoading={loading}
				/>
			</Pagination>
		</div>
	);
}

export default MaterialInventory;
