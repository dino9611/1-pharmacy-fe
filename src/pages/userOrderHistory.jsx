import React from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import Footer from '../components/UI/E-Pharma/footer';
import '../style.css';

const UserOrderHistory = () => {

    return (
        <>
            <MarketplaceNavbar showVisible/>
            <div>
                <div style={{ height: "100vh", backgroundColor: "whitesmoke", paddingTop: "15vh" }}>
                    <h3>My Order History</h3>
                </div>
                <Footer/>
            </div>
        </>
    );
}
 
export default UserOrderHistory;