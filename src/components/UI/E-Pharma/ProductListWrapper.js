import React from 'react';
import ProductItem from './ProductItem';

function ProductListWrapper(props) {
	return (
		<div>
			{props.data &&
				props.data.map((element) => {
					return (
						<ProductItem
							id={element.id}
							image={element.image}
							name={element.name}
							price={element.price}
						/>
					);
				})}
		</div>
	);
}

/**
 * how to use?
 *
 * just past in the data you want and set the data needed for the children
 */

export default ProductListWrapper;
