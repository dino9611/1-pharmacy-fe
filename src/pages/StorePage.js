import React from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import ProductPagination from '../components/section/E-Pharma/ProductPagination';

function StorePage() {
	return (
		<div>
			<MarketplaceNavbar showVisible/>
			<div>
				<ProductPagination />
			</div>
		</div>
	);
}

export default StorePage;
