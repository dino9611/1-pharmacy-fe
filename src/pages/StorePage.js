import React from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import ProductPagination from '../components/section/E-Pharma/ProductPagination';
import Footer from '../components/UI/E-Pharma/footer';

function StorePage() {
	return (
		<>
			<MarketplaceNavbar showVisible/>
			<ProductPagination />
			<Footer />
		</>
	);
}

export default StorePage;
