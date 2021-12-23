import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import ProductTable from '../../UI/productInventory/ProductTable';
import OffCanvas from '../../UI/utility/OffCanvas';
import SearchBar from '../../controller/SearchBar';
import AddInventory from './AddInventory';

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

	const changeLimitHandler = (event) => {
		setLimit(+event.target.value);
	}; // needed for Pagination component props passing and setlimit

	return (
		<div>
			<div className='row'>
				<div className='col-3'>
					<label className='px-2' htmlFor='limit'>
						Item Limit
					</label>
					<select
						className='btn btn-secondary dropdown-toggle'
						name='limit'
						id='item-limit'
						onChange={changeLimitHandler}
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
				<div className='col-2'>
					<button
						className='btn btn-primary'
						type='button'
						data-bs-toggle='offcanvas'
						data-bs-target='#offcanvasAddMaterial'
						aria-controls='offcanvas'
					>
						add
					</button>
				</div>
			</div>
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
			<OffCanvas
				className='offcanvas offcanvas-end'
				header='Add Material'
				id='offcanvasAddMaterial'
				arialabelledby='offcanvas'
			>
				<AddInventory onAddMaterial={() => console.log('submit')} />
			</OffCanvas>
		</div>
	);
}

export default ProductInventory;
