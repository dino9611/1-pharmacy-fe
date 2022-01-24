import { height } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem(props) {
	return (
		<Link
			to={`/product/${props.id}`}
			className='link-dark'
			style={{ textDecoration: 'none' }}
		>
			<div
				className={props.itemWrapperClass}
				style={{
					width: '250px',
					height: '300px',
					marginTop: '1em',
					backgroundColor: '#b3b3b3',
				}}
			>
				<img
					src={props.image}
					className={props.imageClass}
					style={{ height: '50%' }}
					alt={props.imageAlt}
				/>
				<div className={props.itemBodyClass}>
					<h5 className={props.itemTitleClass} style={{ fontSize: '1em' }}>
						{props.itemTitle}
					</h5>
					<p className={props.itemTextClass}>{props.itemText}</p>
				</div>
			</div>
		</Link>
	);
}

export default ProductItem;
