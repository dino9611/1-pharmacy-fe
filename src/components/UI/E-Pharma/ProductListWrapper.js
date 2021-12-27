import React from 'react';
import ProductItem from './ProductItem';

function ProductListWrapper(props) {
	return (
		<div className='d-flex flex-wrap'>
			{props.data &&
				props.data.map((element, index) => {
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
								id={10}
								linkDetailClass='btn btn-primary'
								style={{ width: '2em' }}
							/>
						</div>
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
