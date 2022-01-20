import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem(props) {
	return (
		<Link to={`/product/${props.id}`} className='link-dark'>
			<div className={props.itemWrapperClass} style={props.style}>
				<img
					src={props.image}
					className={props.imageClass}
					alt={props.imageAlt}
				/>
				<div className={props.itemBodyClass}>
					<h5 className={props.itemTitleClass}>{props.itemTitle}</h5>
					<p className={props.itemTextClass}>{props.itemText}</p>
				</div>
			</div>
		</Link>
	);
}

export default ProductItem;
