import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import ProductItem from '../../UI/E-Pharma/ProductItem';
import SortButton from '../../controller/E-pharma/SortButton';
import Category from './Category';
import { API_URL } from '../../../constants/api';
import MarketplaceNavbar from '../admin/marketplaceNavbar';
import { useHistory } from 'react-router-dom';
import HomeProductCard from '../../UI/E-Pharma/homeProductCard';
import ProductListWrapper from '../../UI/productInventory/ProductListWrapper';

function ProductPagination() {
	let [limit, setLimit] = useState(12);
	let [page, setPage] = useState(1);
	let [name, setName] = useState(true);
	let [price, setPrice] = useState(true);
	let history = useHistory();
	let [filteredData, setFilteredData] = useState()


	let { response, error, loading } = useAxios({
		url: `${API_URL}/inventory/store/${page}/${limit}/items?name=${name ? 'ASC' : 'DESC'
			}&price=${price ? 'ASC' : 'DESC'}&min=1000&max=10000000`,
		method: 'get',
	});

	const x = 0;
	const y = 10;
	const styles = {
		transform: `translate(${x}%, ${y}%)`,
	};
	if (response) {
		if (response.itemCount > 10) {
			return (
				<div className='m-5' style={styles}>
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
					<div className='d-flex flex-wrap align-items-stretch m-3'>
						{response &&
							response.list.map((element, index) => {
								return (
									<div class='col-sm-3'>
										<div className='mt-3'>
											<HomeProductCard
												image={element.image}
												onClick={() => history.push(`/product/${element.id}`)}
												name={element.name}
												price={element.price}
											/>
										</div>
									</div>
								);
							})}
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
				<div className='d-flex flex-wrap'>
					<MarketplaceNavbar showVisible />
					{response &&
						response.list.map((element, index) => {
							return (
								<div class='col-sm-3 my-3 d-flex align-items-stretch'>
									<ProductItem
										itemWrapperClass='card w-100 p-3 card-text-start'
										image={element.image}
										imageClass='card-img-top'
										imageAlt={element.name}
										itemBodyClass='card-body'
										itemTitleClass='card-title'
										itemTitle={element.name}
										itemTextClass='card-text'
										itemText={element.price}
										id={element.id}
										linkDetailClass='btn btn-primary'
										style={{ width: '2em' }}
									/>
								</div>
							);
						})}
				</div>
			);
		}
	} else {
		return <h1>Loading ...</h1>;
	}
}

export default ProductPagination;
