import React from 'react';
import { useParams } from 'react-router-dom';
import QuantityCount from '../components/controller/E-pharma/QuantityCount';
import ProductItem from '../components/UI/E-Pharma/ProductItem';
import useAxios from '../hooks/useAxios';

function ProductDetailPage() {
	let { id } = useParams();
	let { response, error, loading } = useAxios({
		url: `http://localhost:2001/inventory/${id}`,
		method: 'get',
	});

	return (
		<div>
			{loading && <h4>loading ...</h4>}
			{response && (
				<div className='d-flex flex-row justify-content-center align-items-center'>
					<div className='col-4 ps-5'>
						<img src={response.image} />
					</div>
					<div className='col-8'>
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
								<QuantityCount />
							</div>
							<div className='col-5'>
								<button className='btn btn-primary'>Add to cart</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductDetailPage;
