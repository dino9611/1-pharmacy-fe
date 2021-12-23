import Basic from './components/controller/Basic';
import MaterialForm from './components/controller/MaterialForm';
import SearchBar from './components/controller/SearchBar';
import UploadImage from './components/controller/UploadImage';
import ProductPagination from './components/section/E-Pharma/ProductPagination';
import AddInventory from './components/section/inventory/AddInventory';
import AddMaterial from './components/section/inventory/AddMaterial';
import AddMedicineIngredients from './components/section/inventory/AddMedicineIngredients';
import EditMaterial from './components/section/inventory/EditMaterial';
import EditProduct from './components/section/inventory/EditProduct';
import MaterialInventory from './components/section/inventory/MaterialInventory';
import ProductInventory from './components/section/inventory/ProductInventory';
import UserProfile from './components/section/UserProfile/UserProfileForm';
import ProductTable from './components/UI/productInventory/ProductTable';
import AddMedicinePage from './pages/AddMedicinePage';
import MaterialInventoryPage from './pages/MaterialInventoryPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
	return (
		<div className='App'>
			<ProductInventory />
			{/* <AddMaterial /> */}
			{/* <MaterialInventory /> */}
			{/* <SearchBar url={`http://localhost:2001/material/search`} /> */}
			{/* <AddMedicinePage /> */}
			{/* <MaterialForm /> */}
			{/* <ProductPagination /> */}
			{/* <AddInventory /> */}
			{/* <Basic /> */}
			{/* <MaterialInventoryPage /> */}
			{/* <AddInventory /> */}
			{/* <UserProfilePage /> */}
			{/* <UploadImage /> */}
			{/* <EditProduct /> */}
			{/* <AddInventory /> */}
		</div>
	);
}

export default App;
