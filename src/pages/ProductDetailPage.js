import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuantityCount from '../components/controller/E-pharma/QuantityCount';
import useAxios from '../hooks/useAxios';
import { addProduct } from '../redux/cartReducer';
import { Link } from 'react-router-dom'

function ProductDetailPage() {
	let [quantity, setQuantity] = useState(1);
	let { id } = useParams();
	let { response, error, loading } = useAxios({
		url: `http://localhost:2001/inventory/${id}`,
		method: 'get',
	});
	console.log(response);

	const dispatch = useDispatch()

	const handleAddToCart = () => {
		localStorage.setItem("cart-item", response.data)
		dispatch(
			addProduct({ ...response, quantity })
		)
	}

	return (
		<div>
			{loading && <h4>loading ...</h4>}
			{response && (
				<div className='d-flex flex-row justify-content-center align-items-center'>
					<div className='col-4 ps-5'>
						<img alt='' src={response.image} className='img-thumbnail' />
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
								<QuantityCount
									quantity={quantity}
									onChange={(value) => setQuantity(value)}
								/>
							</div>
							<div className='col-5'>
								<button className='btn btn-primary' onClick={handleAddToCart}>Add to cart</button>
							</div>
							<Link to='/cart'>tap</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductDetailPage;
