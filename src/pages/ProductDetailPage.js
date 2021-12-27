import React from 'react';
import { useParams } from 'react-router-dom';
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
				<p>
					{response.name}
					{response.price}
				</p>
			)}
		</div>
	);
}

export default ProductDetailPage;
