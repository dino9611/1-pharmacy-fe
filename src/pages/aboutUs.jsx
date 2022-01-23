import React from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import Footer from '../components/UI/E-Pharma/footer';
import '../style.css';
import pharmacy from '../assets/pharmacy.jpeg';

const AboutUs = () => {
    
    return (
        <>
            <MarketplaceNavbar showVisible/>
            <div 
                className="pb-5" 
                style={{ 
                    height: "150vh", 
                }}
            >
                <div style={{ backgroundImage: "linear-gradient(to bottom, var(--pink-color), #ff7b8600", height: "85vh", position: "relative" }}>
                    <img src={pharmacy} alt="" width= "100%" height="100%" style={{ objectFit: "cover", position:"absolute", zIndex: -10 }} />
                    <h1 style={{ position:"absolute", bottom: "35vh", left: "15vw", color: "white" }}>About Us</h1>
                </div>
            </div>
            <Footer/>
        </>
    );
}
 
export default AboutUs;