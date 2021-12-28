import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<div>
			<Link to='/login'>login</Link>
			<Link to='/register'>register</Link>
			<Link to='/forgotPassword'>forgot password</Link>
			<Link to='/resetPassword'>reset password</Link>
			<Link to='/checkout'>checkout</Link>
			<Link to='/users/profile/1'>users profile</Link>
			<Link to='/admin/dashboard'>admin dashboard</Link>
			<Link to='/admin/sales'>sales</Link>
			<Link to='/admin/revenue'>revenue</Link>
			<Link to='/admin/inventory/product'>product inventory page</Link>
			<Link to='/admin/inventory/material'>material inventory</Link>
			<Link to='/login'>login</Link>
			<Link to='/login'>login</Link>
		</div>
	);
}

export default Navbar;
