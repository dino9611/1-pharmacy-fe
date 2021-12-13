import MaterialInventory from './components/section/inventory/MaterialInventory';
import ProductInventory from './components/section/inventory/ProductInventory';

function App() {
	return (
		<div className='App'>
			<ProductInventory />
			<MaterialInventory />
		</div>
	);
}

export default App;