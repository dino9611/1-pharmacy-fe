// import MaterialInventory from './components/section/inventory/MaterialInventory';
// import ProductInventory from './components/section/inventory/ProductInventory';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Marketplace from './pages/marketplace';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import AdminDashboard from './pages/adminDashboard';
import Checkout from './pages/checkout';
import PageNotFound from './pages/pageNotFound';
import PrivateRoute from './PrivateRoute';

function App() {
	return (
		<div className='App'>
			{/* <ProductInventory /> */}
			{/* <MaterialInventory /> */}
			<Switch>
				<Route path="/" exact component={Marketplace} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/forgotPassword" component={ForgotPassword} />
				<Route path="/resetPassword" component={ResetPassword} />
				<PrivateRoute path="/dashboard" exact component={AdminDashboard} adminAuth={true}/>
				<PrivateRoute path="/checkout" exact component={Checkout} adminAuth={false}/>
				<Route path="*" component={PageNotFound} />
			</Switch>
		</div>
	);
}

export default App;