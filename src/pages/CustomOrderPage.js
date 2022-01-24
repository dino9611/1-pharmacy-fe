import { width } from '@mui/system';
import React from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import Prescriptions from '../components/section/customOrder/Prescriptions';

function CustomOrderPage() {
	const x = 30;
	const y = 100;
	const styles = {
		transform: `translate(${x}%, ${y}%)`,
	};
	return (
		<div className='d-flex justify-content-center' style={{ width: '100%' }}>
			<MarketplaceNavbar showVisible/>
			<div style={styles}>
				<Prescriptions />
			</div>
		</div>
	);
}

export default CustomOrderPage;
