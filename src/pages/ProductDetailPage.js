import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import QuantityCount from '../components/controller/E-pharma/QuantityCount';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import { API_URL } from '../constants/api';
import useAxios from '../hooks/useAxios';

function ProductDetailPage() {
	let [quantity, setQuantity] = useState(1);
	let { id } = useParams();
	let { response, error, loading } = useAxios({
		url: `${API_URL}/inventory/${id}`,
		method: 'get',
	});
	const x = 0;
	const y = 60;
	const styles = {
		transform: `translate(${x}%, ${y}%)`,
	};

	return (
		<div>
			<MarketplaceNavbar showVisible/>
			{loading && <h4>loading ...</h4>}
			{response && (
				<div
					className='d-flex flex-row justify-content-center align-items-center card mx-5 col-center'
					style={styles}
				>
					<div className='col-4 p-5' style={{ width: '400px' }}>
						<img alt='' src={response.image} className='img-thumbnail' />
					</div>
					<div className='col-8 ps-5'>
						<h3>{response.name}</h3>
						<div className='mt-4'>
							<h5>{response.description}</h5>
						</div>
						<div className='mt-4'>
							<h6>Serving: {response.serving} / day</h6>
						</div>
						<div className='row mt-5'>
							<div className='col-2 pt-2'>
								<h6>Rp.{response.price / 1000}.000</h6>
							</div>
							<div className='col-3'>
								<QuantityCount
									quantity={quantity}
									onChange={(value) => setQuantity(value)}
								/>
							</div>
							<div className='col-5'>
								<button className='btn btn-primary'>Add to cart</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{error && <h1>ERROR </h1>}
		</div>
	);
}

export default ProductDetailPage;
