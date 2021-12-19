import React from 'react';
import './style.css';
import Logo from '../../../assets/ShortNameLightmode.svg'

const TopNavbar = (props) => {
    return (
        <div 
            class="d-flex 
            justify-content-between 
            align-items-center 
            flex-row px-4 py-2" 
            style={{
                height: "10vh",
                backgroundColor: "white",
                borderBottom: "2px solid lightgray",
                boxShadow: "0 1px 15px -5px gray"

            }}
        >
            <div class="flex-fill">
                <img 
                    src={Logo} 
                    alt=""
                    style={{
                        maxWidth: 150,
                    }}
                />
            </div>
            <div class="flex-fill d-flex justify-content-end">
                <h6 style={{
                        color: "var(--black-color)",
                        transform: "translateY(8px)",
                    }}
                >
                    <i class="fas fa-user-circle" 
                        style={{
                            paddingRight: 5,
                            fontSize: 20,
                            transform: "translateY(2px)",
                        }}
                    ></i> 
                    hello, admin
                </h6>
                <button 
                    style={{
                        backgroundColor: "transparent",
                        border: "0px solid white",
                        fontSize: 25,
                        color: "var(--black-color)",
                        paddingLeft: 20,
                        paddingRight: 10
                    }}>
                    <i class="far fa-bell"></i>
                </button>
            </div>            
        </div>
    );
}
 
export default TopNavbar;