import React from 'react';
import AddMaterial from '../components/section/inventory/AddMaterial';
import MaterialInventory from '../components/section/inventory/MaterialInventory';
import SearchBar from '../components/controller/SearchBar';
import { useState } from 'react/cjs/react.development';
function MaterialInventoryPage() {
	const [addMaterial, isAddMaterial] = useState(false);

	return (
		<div>
			{addMaterial ? (
				<AddMaterial>
					<button onClick={() => isAddMaterial(false)}>close</button>
				</AddMaterial>
			) : (
				<button onClick={() => isAddMaterial(true)}>add</button>
			)}
			<SearchBar url={`http://localhost:2001/material/search`} />
			<MaterialInventory />
		</div>
	);
}

export default MaterialInventoryPage;
