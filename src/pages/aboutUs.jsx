import React from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import Footer from '../components/UI/E-Pharma/footer';
import '../style.css';
import pharmacy from '../assets/pharmacy.jpeg';
import fatherhood from '../assets/fatherhood.svg';
import application from '../assets/application.svg';
import team from '../assets/team.jpeg';
import circle from '../assets/circle.png';
import SquareButton from '../components/UI/authInventory/squareButton';
import HomeContainer6 from '../components/UI/E-Pharma/homeContainer6';

const AboutUs = () => {
    return (
        <>
            <MarketplaceNavbar showVisible/>
            <div style={{ backgroundImage: "linear-gradient(to bottom, var(--pink-color), #ff7b8600", height: "85vh", position: "relative" }}>
                <img src={pharmacy} alt="" width= "100%" height="100%" style={{ objectFit: "cover", position:"absolute", zIndex: -10 }} />
                <h1 style={{ position:"absolute", bottom: "35vh", left: "15vw", color: "white" }}>
                    Heal the world,<br/>make it a better place.
                </h1>
                <img src={circle} alt="" style={{ position: "absolute", bottom: -100 }}/>
                <img src={circle} alt="" style={{ position: "absolute", top: 0, right: 0, transform: "scaleX(-1)" }}/>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "whitesmoke", paddingTop: 50 }}>
                <div className="d-flex flex-row" style={{ width: "70vw", height: "40vh"}}>
                    <div style={{ width: "40%" }}>
                        <img src={fatherhood} alt="" width="90%" />
                    </div>
                    <div style={{ width: "60%" }}>
                        <h3 style={{ color: "var(--pink-color)", fontWeight: 700 }}>
                            Indonesia's lack of access to medicines is what drives us to pursue Obatin
                        </h3>
                        <p style={{ fontSize: 18 }}>
                            Global health policies and different research areas have focused on the relevance and impact of medicine shortages. 
                            Studies suggest there have been difficulties with access to medicines since the beginning of the 20th century.
                            However, in the response of this concerns with shortages, 
                            we believe this is our opportunity to show that accessible medicine should be served for everyone.
                        </p>
                    </div>
                </div>
                <div className="d-flex flex-row" style={{ width: "70vw", height: "40vh"}}>
                    <div style={{ width: "60%" }}>
                        <h3 style={{ color: "var(--pink-color)", fontWeight: 700, marginTop: 25 }}>
                            Supported by the advancement of technology through E-commerce
                        </h3>
                        <p style={{ fontSize: 18 }}>
                            Especially during this pandemic situation, Obatin is the most effective and fastest way
                            to fulfill people's needs as it is accessible to everyone. We also aim to help spread the importance of health awareness.
                            That being said, we are here to take part in the healthcare revolution.
                        </p>
                    </div>
                    <div style={{ width: "40%" }}>
                        <img src={application} alt="" height="90%" />
                    </div>
                </div>
            </div>
            <div style={{ backgroundImage: "linear-gradient(to bottom, #ff7b8600, var(--lighter-pink-color)", height: "80vh", position: "relative" }}>
                <img src={team} alt="" width= "100%" height="100%" style={{ objectFit: "cover", position:"absolute", zIndex: -10 }} />
                <h1 style={{ position:"absolute", bottom: "20vh", left: "15vw", color: "white" }}>
                    Let's grow altogether<br/>& make an impact in Health Care!
                </h1>
                <SquareButton label="JOIN US" style={{ position:"absolute", bottom: "15vh", left: "15vw" }}/>
                <img src={circle} alt="" style={{ position: "absolute", top: -50, right: 0, transform: "scaleX(-1)" }}/>
            </div>
            <HomeContainer6/>
            <Footer/>
        </>
    );
}
 
export default AboutUs;