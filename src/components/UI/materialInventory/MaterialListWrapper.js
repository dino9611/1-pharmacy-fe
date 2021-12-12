import React from 'react';
import MaterialListItem from './MaterialListItem';

function MaterialListWrapper(props) {
	console.log(props.data);
	return (
		<div>
			{props.data &&
				props.data.map((element) => {
					return (
						<MaterialListItem
							id={element.id}
							name={element.name}
							bottle_quantity={element.bottle_quantity}
							quantity_per_bottle={element.quantity_per_bottle}
							stock_quantity={element.stock_quantity}
							UnitId={element.UnitId}
						/>
					);
				})}
		</div>
	);
}

export default MaterialListWrapper;
