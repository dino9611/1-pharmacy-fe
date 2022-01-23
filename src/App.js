import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductInventoryPage from './pages/ProductInventoryPage';
import MaterialInventory from './components/section/inventory/MaterialInventory';
import Dashboard from './pages/dashboard';
import 'sweetalert2/src/sweetalert2.scss';
import 'react-circular-progressbar/dist/styles.css';
import UserDatas from './pages/userDatas';
import OrderHistory from './pages/orderHistory';
import VerifyAccount from './pages/verifyAccount';
import OrderRequest from './pages/orderRequest';
import jwt from 'jsonwebtoken';
import ProductDetailPage from './pages/ProductDetailPage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserOrderHistory from './pages/userOrderHistory';

function App() {
	const dispatch = useDispatch();

	const { hasReloaded } = useSelector((state) => {
		return {
			hasReloaded: state.auth.hasReloaded,
		};
	});

	const keepLogin = useCallback(async () => {
		const token = localStorage.getItem('token-access');

		if (token) {
			const decoded = jwt.decode(token);
			dispatch({ type: 'LOGIN', payload: { isAdmin: decoded.isAdmin } });
		} else {
			dispatch({ type: 'NO_ACCESS_TOKEN' });
		}

		console.log(token);
	}, [dispatch]);

	useEffect(() => {
		keepLogin();
	}, [keepLogin]);

	if (!hasReloaded) {
		return null;
	}

	return (
		<div className='App' style={{ height: '100vh'}}>
			<Switch>
				<Route path='/' exact component={Marketplace} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/forgotPassword' component={ForgotPassword} />
				<Route path='/resetPassword' component={ResetPassword} />
				<Route path='/verifyAccount' component={VerifyAccount} />
				<Route path='/product/:id' component={ProductDetailPage} />
				<Route path='/profile/orderHistory' component={UserOrderHistory} /> 
				{/* /orderHistory/:id */}
				<PrivateRoute
					path='/checkout'
					exact
					component={Checkout}
					adminAuth={false}
				/>
				<PrivateRoute
					path='/admin'
					exact
					component={Dashboard}
					adminAuth={true}
				/>
				<PrivateRoute
					path='/admin/dashboard'
					exact
					component={Dashboard}
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
				<PrivateRoute
					path='/admin/userDatas'
					exact
					component={UserDatas}
					adminAuth={true}
				/>
				<PrivateRoute
					path='/admin/userDatas/orderHistory/:id'
					exact
					component={OrderHistory}
					adminAuth={true}
				/>
				<PrivateRoute
					path='/admin/orderRequest'
					exact
					component={OrderRequest}
					adminAuth={true}
				/>
				<PrivateRoute
					path='/admin/inventory/product'
					component={ProductInventoryPage}
					adminAuth={true}
				/>
				<PrivateRoute
					path='/admin/inventory/material'
					component={MaterialInventory}
					adminAuth={true}
				/>
				<Route path='*' component={PageNotFound} />
			</Switch>
			<ToastContainer />
		</div>
	);
}

export default App;
