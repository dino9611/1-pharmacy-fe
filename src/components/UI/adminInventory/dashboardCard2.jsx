import React from 'react';
import './style.css';

const DashboardCard2 = (props) => {
    return (
        <div 
            className= "d-flex justify-content-start align-items-center flex-column py-3"
            style={{ 
                height: "52vh",
                position: "relative",
                boxShadow: "1px 5px 15px -5px gray",
                backgroundColor: "white",
                ...props.style
            }}
        >
            <h4 style={{ color: "var(--pink-color)" }}>{props.title}</h4>
            <div 
                className="mt-0 mb-3"
                style={{ 
                    width: "100%", 
                    height: 1, 
                    backgroundColor: "silver"
                }}
            ></div>
            <div className="px-3">
                
            </div>
            <div 
                className="mt-0 mb-3" 
                style={{ 
                    width: "100%", 
                    height: 1, 
                    backgroundColor: "silver",
                    position: "absolute",
                    bottom: 30
                }}
            ></div>
            <div 
                style={{
                    fontSize: 20,
                    position: "absolute",
                    bottom: 8,
                    right: 8
                }}
                onClick={props.onClick}
            >
                <i class="fas fa-external-link-alt"></i>
            </div>
        </div>
    );
};

export default DashboardCard2;