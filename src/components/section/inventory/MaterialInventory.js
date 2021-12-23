import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import MaterialTable from '../../UI/materialInventory/MaterialTable';
import OffCanvas from '../../UI/utility/OffCanvas';
import SearchBar from '../../controller/SearchBar';
import AddMaterial from './AddMaterial';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';
import EditMaterial from './EditMaterial';

function MaterialInventory() {
	let [limit, setLimit] = useState(9);
	let [page, setPage] = useState(1);

	let { response, error, loading } = useAxios({
		url: `http://localhost:2001/material/getList/${page}/${limit}`,
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
				onPageChange={changePageHandler}
				totalCount={response && response.pageLimit}
				siblingCount={2}
				currentPage={page}
				pageSize={limit}
			>
				<MaterialTable data={response && response.list} loading={loading} />
			</Pagination>
			<OffCanvas
				className='offcanvas offcanvas-end'
				header='Add Material'
				id='offcanvasAddMaterial'
				arialabelledby='offcanvas'
			>
				<AddMaterial onAddMaterial={() => console.log('submit')} />
			</OffCanvas>
		</div>
	);
}

export default MaterialInventory;
