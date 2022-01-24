import React from 'react';
import AddMaterial from '../components/section/inventory/AddMaterial';
import MaterialInventory from '../components/section/inventory/MaterialInventory';
import SearchBar from '../components/controller/SearchBar';
import { useState } from 'react/cjs/react.development';
import { API_URL } from '../constants/api';
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
			<SearchBar url={`${API_URL}/material/search`} />
			<MaterialInventory />
		</div>
	);
}

export default MaterialInventoryPage;
