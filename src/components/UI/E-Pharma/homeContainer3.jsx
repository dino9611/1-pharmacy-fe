import React from 'react';
import ProductCarousel from '../../section/E-Pharma/productCarousel';
import '../../../components/UI/adminInventory/style.css';

const HomeContainer3 = (props) => {
	return (
		<div className="bestSellerContainer d-flex flex-row justify-content-center align-items-center px-5">
            <h3 
                className="px-3 py-4 me-5" 
                style={{ 
                    width: "15vw", 
                    backgroundColor: "mistyrose", 
                    color: "firebrick", 
                    borderRadius: 15, 
                    border: "2px solid var(--pink-color)",  
                    boxShadow: "1px 5px 15px -5px gray",
                    WebkitBoxShadow: "1px 5px 15px -5px gray",
                    MozBoxShadow: "1px 5px 15px -5px gray",
                }}>
                Top 10<br/>Medicine<br/>Best Seller
            </h3>
            <div style={{ width: "75vw" }}>
                <ProductCarousel/> 
            </div>
        </div>
	);
}

export default HomeContainer3;
