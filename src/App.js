import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Marketplace from './pages/marketplace';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import Checkout from './pages/checkout';
import PageNotFound from './pages/pageNotFound';
import PrivateRoute from './PrivateRoute';
import Sales from './pages/sales';
import Revenue from './pages/revenue';
import AdminDashboard from './pages/adminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetailPage from './pages/ProductDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import ProductInventoryPage from './pages/ProductInventoryPage';
import MaterialInventory from './components/section/inventory/MaterialInventory';
import NavbarUser from './components/UI/utility/NavbarUser';
import CustomOrder from './components/section/customOrder/CustomOrder';
import Prescriptions from './components/section/customOrder/Prescriptions';
function App() {
	return (
		<div className='App'>
			<NavbarUser />
			<Link to='/custom/order'>
				<button>Custom Order</button>
			</Link>
			<Prescriptions />
			<Link to='/admin/inventory/product'>
				<button>product</button>
			</Link>
			<Link to='/admin/inventory/material'>
				<button>material</button>
			</Link>
			<Switch>
				<Route path='/' exact component={Marketplace} />
				<Route path='/users/:id' exact component={UserProfilePage} />
				<Route path='/users/login' component={Login} />
				<Route path='/users/register' component={Register} />
				<Route path='/forgotPassword' component={ForgotPassword} />
				<Route path='/resetPassword' component={ResetPassword} />
				<Route path='/product/:id' component={ProductDetailPage} />
				<Route
					path='/custom/order'
					exact
					component={CustomOrder}
					adminAuth={true}
				/>

				<PrivateRoute
					path='/checkout'
					exact
					component={Checkout}
					adminAuth={false}
				/>
				<PrivateRoute
					path='/users/profile/:id'
					component={UserProfilePage}
					adminAuth={false}
				/>
				<PrivateRoute
					path='/admin/dashboard'
					exact
					component={AdminDashboard}
					adminAuth={true}
				/>
				<PrivateRoute
					path='/admin/sales'
					exact
					component={Sales}
					adminAuth={true}
				/>
				<PrivateRoute
					path='/admin/revenue'
					exact
					component={Revenue}
					adminAuth={true}
				/>
				<Route
					path='/admin/inventory/product'
					component={ProductInventoryPage}
					adminAuth={false}
				/>
				<Route
					path='/admin/inventory/material'
					component={MaterialInventory}
					adminAuth={false}
				/>
				<Route path='*' component={PageNotFound} />
			</Switch>
			<ToastContainer />
		</div>
	);
}

export default App;
