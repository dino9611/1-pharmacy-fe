import Basic from './components/controller/Basic';
import MaterialForm from './components/controller/MaterialForm';
import SearchBar from './components/controller/SearchBar';
import AddInventory from './components/section/inventory/AddInventory';
import AddMaterial from './components/section/inventory/AddMaterial';
import MaterialInventory from './components/section/inventory/MaterialInventory';
import ProductInventory from './components/section/inventory/ProductInventory';
import AddMedicinePage from './pages/AddMedicinePage';
import MaterialInventoryPage from './pages/MaterialInventoryPage';

function App() {
	return (
		<div className='App'>
			{/* <ProductInventory /> */}
			<AddMaterial />
			<MaterialInventory />
			{/* <SearchBar url={`http://localhost:2001/material/search`} /> */}
			{/* <AddMedicinePage /> */}
			{/* <MaterialForm /> */}

			{/* <AddInventory /> */}
			{/* <Basic /> */}
			{/* <MaterialInventoryPage /> */}
		</div>
	);
}

export default App;
