import React, { useState } from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import Footer from '../components/UI/E-Pharma/footer';
import '../style.css';
import nurse from '../assets/nurse.jpeg';
import Input from '../components/UI/authInventory/input';
import SquareButton from '../components/UI/authInventory/squareButton';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../constants/api';
import circle from '../assets/circle.png';
import HomeContainer6 from '../components/UI/E-Pharma/homeContainer6';

const ContactUs = () => {
    const [sendMessage, setSendMessage] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const onFormInputChange = (value, name) => {
        setSendMessage({ ...sendMessage, [name]: value });
    };

    const onClickSendMessage = async (e) => {
        e.preventDefault();
        const { name, email, subject, message } = sendMessage;

        if (name.length && email.length && subject.length && message.length) {
            try {
                let dataBody = {
                    name,
                    email,
                    subject,
                    message                
                };
                
                await axios.post(`${API_URL}/auth/userSendMessage`, dataBody);

                toast.success("Your message has been sent!", {
                    position: "top-right",
                    icon: "🔐"
                });
                
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            };
        } else {
            toast.error("All fields are required!", {
                position: "top-right",
                icon: "❌"
            });
        };
    };

    return (
        <>
            <MarketplaceNavbar showVisible/>
            <div style={{ backgroundImage: "linear-gradient(to bottom, var(--pink-color), #ff7b8600", height: "85vh", position: "relative" }}>
                <img src={nurse} alt="" width= "100%" height="100%" style={{ objectFit: "cover", position:"absolute", zIndex: -10 }} />
                <h1 style={{ position:"absolute", bottom: "35vh", left: "15vw", color: "white" }}>Contact Us</h1>
                <img src={circle} alt="" style={{ position: "absolute", top: 50 }}/>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "70vh", backgroundColor: "whitesmoke" }}>
                <div style={{ height: "50vh", width: "25vw", marginRight: 15 }} >
                    <h3 style={{ color: "var(--pink-color)", fontWeight: 700 }}>Office Address</h3>
                    <p>
                        Obatin Pharmaceuticals<br/>
                        PT Obatin Farmasi Nusantara<br/>
                        Jl. Bukit Pakar Timur IV Kav. B1, Ciburial, Kecamatan Cimenyan, Bandung, Jawa Barat, 40198
                    </p>
                    <div style={{ width: "40%", height: 10, backgroundColor: "gold" }}></div>
                </div>
                <div style={{ minHeight: "50vh", width: "55vw" }}>
                    <Input
                        type="text" 
                        onChange={onFormInputChange}
                        value={sendMessage.name} 
                        name="name" 
                        placeholder="Your Name"
                        style={{width: "50%"}}
                    />
                    <Input
                        type="email" 
                        onChange={onFormInputChange}
                        value={sendMessage.email} 
                        name="email" 
                        placeholder="Your Email"
                        style={{ width: "50%" }}
                    />
                    <br />
                    <Input
                        type="text" 
                        onChange={onFormInputChange}
                        value={sendMessage.subject} 
                        name="subject" 
                        placeholder="Subject"
                        style={{ width: "100%" }}
                    />
                    <br />
                    <Input 
                        type="text" 
                        onChange={onFormInputChange}
                        value={sendMessage.message} 
                        name="message"  
                        placeholder="Your Message" 
                        style={{ width: "100%", height: "25vh", borderRadius: 30, padding: 10, overflowY: "visible" }}
                    ></Input>
                    <SquareButton className="m-3" label="SEND MESSAGE" onClick={onClickSendMessage}/>
                </div>
            </div>
            <HomeContainer6/>
            <Footer/>
        </>
    );
}
 
export default ContactUs;