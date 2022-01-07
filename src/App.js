// import MaterialInventory from './components/section/inventory/MaterialInventory';
// import ProductInventory from './components/section/inventory/ProductInventory';
import React from 'react';
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
import Dashboard from './pages/dashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'sweetalert2/src/sweetalert2.scss';
import UserDatas from './pages/userDatas';
import OrderHistory from './pages/orderHistory';
import VerifyAccount from './pages/verifyAccount';
import OrderRequest from './pages/orderRequest';
  
function App() {
	return (
		<div className="App" style={{ overflowY: "hidden", height: "100vh" }}>
			{/* <ProductInventory /> */}
			{/* <MaterialInventory /> */}
			<Switch>
				<Route path="/" exact component={Marketplace} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/forgotPassword" component={ForgotPassword} />
				<Route path="/resetPassword" component={ResetPassword} />
				<Route path="/verifyAccount" component={VerifyAccount} />
				<PrivateRoute path="/checkout" exact component={Checkout} adminAuth={false}/>
				<PrivateRoute path="/admin" exact component={Dashboard} adminAuth={true}/>
				<PrivateRoute path="/admin/dashboard" exact component={Dashboard} adminAuth={true}/>
				<PrivateRoute path="/admin/sales" exact component={Sales} adminAuth={true}/>
				<PrivateRoute path="/admin/revenue" exact component={Revenue} adminAuth={true}/>
				<PrivateRoute path="/admin/userDatas" exact component={UserDatas} adminAuth={true}/>
				<PrivateRoute path="/admin/userDatas/orderHistory/:id" exact component={OrderHistory} adminAuth={true}/>
				<PrivateRoute path="/admin/orderRequest" exact component={OrderRequest} adminAuth={true}/>
				<Route path="*" component={PageNotFound} />
			</Switch>
			<ToastContainer/>
		</div>
	);
}

export default App;