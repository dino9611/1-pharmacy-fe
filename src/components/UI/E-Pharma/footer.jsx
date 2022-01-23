import React from 'react';
import SquareButton from '../authInventory/squareButton';
import '../../../components/UI/adminInventory/style.css';

const Footer = (props) => {
	return (
		<div className="footer d-flex justify-content-start align-items-start p-5" style={{ height: "50vh", backgroundColor: "mistyrose", position: "relative" }}>
            <div className="ms-5">
                <div className="mb-2">Contact Us</div>
                <div className="mb-2">FAQ</div>
                <div className="mb-2">Account</div>
                <div className="mb-2">Privacy Policy</div>
                <div className="mb-2">Terms & Conditions</div>
                <div className="mb-2">Terms of Service</div>
                <div className="mb-2">Refund policy</div>
                <div className="mb-5">Reviews</div>
                ©OBATIN PHARMACEUTICALS EST 2021
            </div>
            <div className="ms-5">
                <div className="mb-2"><i class="fab fa-instagram"></i> Instagram</div>
                <div className="mb-2"><i class="fab fa-tiktok"></i> TikTok</div>
                <div className="mb-2"><i class="fab fa-twitter"></i> Twitter</div>
                <div className="mb-2"><i class="fab fa-youtube"></i> YouTube</div>
            </div>
            <div style={{ position: "absolute", top: 50, right: 80 }}>
                <h5>JOIN FOR<br/>EXCLUSIVE TIPS<br/>AND DEALS</h5>
                <input type="email" placeholder="email" style={{ backgroundColor: "transparent", border: "0px solid white", borderBottom: "1px solid gray", width: 150 }}/>
                <SquareButton label="JOIN" style={{ width: 80, padding: 5, marginLeft: 10 }}/>
            </div>
        </div>
	);
}

export default Footer;
