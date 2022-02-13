import React, { useState } from 'react';
import Pagination from '../../controller/Pagination';
import useAxios from '../../../hooks/useAxios';
import SortButton from '../../controller/E-pharma/SortButton';
import { API_URL } from '../../../constants/api';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import HomeProductCard from '../../UI/E-Pharma/homeProductCard';

function ProductPagination() {
	const [limit, setLimit] = useState(12);
	const [page, setPage] = useState(1);
	const [name, setName] = useState(true);
	const [price, setPrice] = useState(true);
	const history = useHistory();

	const { response, error, loading } = useAxios({
		url: `${API_URL}/inventory/store/${page}/${limit}/items?name=${name ? 'ASC' : 'DESC'
			}&price=${price ? 'ASC' : 'DESC'}&min=1000&max=100000`,
		method: 'get',
	});

    const addToCart = async (id) => {
		try {
			await axios.post(`${API_URL}/cart`, {
				medicineId: id,
				quantity: 1,
			}, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token-access')}`
				}
			});
			toast.success("Item added to cart", {
				position: "top-right",
				icon: "🤩"
			});
		} catch (error) {
			toast.error(error.response.data.data.message || "Failed to add to cart. Try again.", {
				position: "top-right",
				icon: "😭"
			});
		}
	}

	return (
		<div
			className='d-flex flex-column justify-content-center align-items-center'
			style={{
				minHeight: '100vh',
				width: '100vw',
				backgroundColor: 'white',
			}}
		>
			<div className='bestSellerContainer d-flex flex-column justify-content-start align-items-center mb-5' style={{ width: '100%', height: '30vh' }}>
				<div style={{ width: '90%', textAlign: 'start', paddingTop: '15vh' }}>
					<nav aria-label="breadcrumb bg-success">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="/">Home</a></li>
							<li class="breadcrumb-item active" aria-current="page">Medicines & Pharmacy</li>
						</ol>
					</nav>
				</div>
				<h2 style={{ width: '90%', textAlign: 'start', transform: 'translateY(-5px)' }}>
					Medicine & Pharmacy
				</h2>
			</div>
			<div style={{ width: '90%', textAlign: 'start' }}>
				<SortButton
					sortButtonChange={(value) => setPrice(value)}
					label='Sort by Price'
				/>
			</div>
			<div className='d-flex flex-wrap flex-row justify-content-center align-items-center mt-3' style={{ width: '100%' }}>
				{response && response.list.map((element, index) => {
					return (
						<div className='mx-2 mb-5'>
							<HomeProductCard
								image={element.image}
								onClick={() => history.push(`/product/${element.id}`)}
								name={element.name}
								price={element.price.toLocaleString('in', 'ID')}
								style={{ 
									width: 270
								}}
								onAddToCartClick={() => addToCart(element.id)}
							/>
						</div>
					);
				})}
			</div>
			<div className='my-5'>
				<Pagination
					onLimitChange={(value) => setLimit(value)}
					onPageChange={(value) => setPage(value)}
					totalCount={response && response.itemCount}
					siblingCount={2}
					currentPage={page}
					pageSize={limit}
				/>
			</div>
		</div>
	);
}

export default ProductPagination;
