import React from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import OrderHistoryTable from '../components/section/admin/orderHistoryTable';
import Footer from '../components/UI/E-Pharma/footer';
import '../style.css';

const UserOrderHistory = () => {
    
    return (
        <>
            <MarketplaceNavbar showVisible/>
            <div className="px-5 pb-5" style={{ minHeight: "50vh", backgroundColor: "whitesmoke", paddingTop: "15vh" }}>
                <div className="d-flex flex-row mb-3">
                    <div
                        className="navbarButton"
                        style={{ 
                            fontSize: 22, 
                            paddingRight: 10,
                        }}
                        onClick=""
                    >
                        <i class="fas fa-arrow-left"></i>
                    </div>
                    <h3 className="mb-4">My Transactions History</h3>
                </div>
                <div className="mx-5">
                    <OrderHistoryTable/>
                </div>
            </div>
            <Footer/>
        </>
    );
}
 
export default UserOrderHistory;