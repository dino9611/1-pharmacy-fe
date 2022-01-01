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
import AdminDashboard from './pages/adminDashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserHistory from './pages/userHistory';
import UserTransactions from './pages/userTransactions';
import VerifyAccount from './pages/verifyAccount';
  
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
				<PrivateRoute path="/admin/dashboard" exact component={AdminDashboard} adminAuth={true}/>
				<PrivateRoute path="/admin/sales" exact component={Sales} adminAuth={true}/>
				<PrivateRoute path="/admin/revenue" exact component={Revenue} adminAuth={true}/>
				<PrivateRoute path="/admin/userHistory" exact component={UserHistory} adminAuth={true}/>
				<PrivateRoute path="/admin/userHistory/userTransactions" exact component={UserTransactions} adminAuth={true}/>
				<Route path="*" component={PageNotFound} />
			</Switch>
			<ToastContainer/>
		</div>
	);
}

export default App;