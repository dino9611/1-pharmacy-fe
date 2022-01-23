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

const HomeContainer6 = () => {
    return (
        <div className="text-center py-3" style={{ backgroundColor: "var(--blue-color)", color: "white" }}>
            You've got questions, we've got facts.
            Questions about your health? Curious which medicine is suitable for your problem?
            <b style={{ fontWeight: 600 }}> Text us at +628174131245</b>
        </div>
    )
}
const Marketplace = () => {

    return (
        <>
            <MarketplaceNavbar/>
            <div className="d-flex flex-column">
                <HomeCarousel/>
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