import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<div>
			<Link to={'/admin/inventory/material'}>
				<button>material</button>
			</Link>
			<Link to={'/admin/inventory/product'}>
				<button>product</button>
			</Link>
		</div>
	);
}

export default Navbar;
