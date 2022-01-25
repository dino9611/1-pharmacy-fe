import React from 'react';
import '../components/UI/adminInventory/style.css';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import HomeCarousel from '../components/section/E-Pharma/homeCarousel';
import HomeContainer1 from '../components/UI/E-Pharma/homeContainer1';
import HomeContainer2 from '../components/UI/E-Pharma/homeContainer2';
import HomeContainer3 from '../components/UI/E-Pharma/homeContainer3';
import HomeContainer4 from '../components/UI/E-Pharma/homeContainer4';
import HomeContainer5 from '../components/UI/E-Pharma/homeContainer5';
import Footer from '../components/UI/E-Pharma/footer';
import HomeContainer6 from '../components/UI/E-Pharma/homeContainer6';

const Marketplace = () => {
    return (
        <>
            <MarketplaceNavbar/>
            <div className="d-flex flex-column">
                <div style={{ width: "100vw", height: "85vh" }}>
                    <HomeCarousel/>
                </div>
                <HomeContainer1/>
                <HomeContainer2/>
                <HomeContainer3/>
                <HomeContainer4/>
                <HomeContainer5/>
                <HomeContainer6/>
                <Footer/>
            </div>
        </>
    );
}
 
export default Marketplace;