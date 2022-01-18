import React, { useDispatch, useCallback, useEffect } from 'react';
import axios from 'axios';
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
import AdminDashboard from './pages/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetailPage from './pages/ProductDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import ProductInventoryPage from './pages/ProductInventoryPage';
import MaterialInventory from './components/section/inventory/MaterialInventory';
import NavbarUser from './components/UI/utility/NavbarUser';
import CustomOrder from './components/section/customOrder/CustomOrder';
import Prescriptions from './components/section/customOrder/Prescriptions';
import Dashboard from './pages/dashboard';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/src/sweetalert2.scss';
import 'react-circular-progressbar/dist/styles.css';
import UserDatas from './pages/userDatas';
import OrderHistory from './pages/orderHistory';
import VerifyAccount from './pages/verifyAccount';
import OrderRequest from './pages/orderRequest';
// import Cart from './pages/cart'
import { API_URL } from './constants/api';
import Test from "./pages/test"

function App() {
	// const dispatch = useDispatch();

	// const keepLogin = useCallback(async () => {
	//     let token = localStorage.getItem("token-access");
	//     const response = await axios.get(`${API_URL}/keepLogin`, {
	//         headers: {
	//             Authorization: "Bearer " + token,
	//         },
	//     });
	//     dispatch({ type: "LOGIN", payload: response.data });
	// }, [dispatch]);

	// useEffect(() => {
	//     keepLogin();
	// }, [keepLogin]);

	return (

		<div className='App'>

			<Switch>
				<div className="App" style={{ overflowY: "hidden", height: "100vh" }}>
					{/* <ProductInventory /> */}
					{/* <MaterialInventory /> */}
					<NavbarUser />
					{/* <Route path="/test" exact component={Test} /> */}
					<Route path="/" exact component={Marketplace} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/forgotPassword" component={ForgotPassword} />
					<Route path="/resetPassword" component={ResetPassword} />
					<Route path="/verifyAccount" component={VerifyAccount} />
					{/* <Route path="/cart" exact component={Cart} /> */}
					<PrivateRoute path="/checkout" exact component={Checkout} adminAuth={false} />
					<PrivateRoute path="/admin" exact component={AdminDashboard} adminAuth={true} />
					<PrivateRoute path="/admin/dashboard" exact component={AdminDashboard} adminAuth={true} />
					<PrivateRoute path="/admin/sales" exact component={Sales} adminAuth={true} />
					<PrivateRoute path="/admin/revenue" exact component={Revenue} adminAuth={true} />
					<PrivateRoute path="/admin/userDatas" exact component={UserDatas} adminAuth={true} />
					<PrivateRoute path="/admin/userDatas/orderHistory/:id" exact component={OrderHistory} adminAuth={true} />
					<PrivateRoute path="/admin/orderRequest" exact component={OrderRequest} adminAuth={true} />
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
					<Route path="*" component={PageNotFound} />
				</div>
			</Switch>
			<ToastContainer />
		</div>
	);
}

export default App;
