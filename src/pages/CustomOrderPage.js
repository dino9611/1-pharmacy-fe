import React from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import Prescriptions from '../components/section/customOrder/Prescriptions';

function CustomOrderPage() {
	return (
		<div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
			<MarketplaceNavbar showVisible/>
			<div>
				<Prescriptions />
			</div>
		</div>
	);
}

export default CustomOrderPage;
